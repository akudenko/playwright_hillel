import { expect } from "@playwright/test";
import BaseController from "./BaseController";

export default class CarsController extends BaseController {
  async getCars(authCookie: string) {
    const response = await this.request.get(
      "https://qauto.forstudy.space/api/cars",
      {
        headers: {
          Cookie: authCookie,
        },
      }
    );

    expect(response.status()).toBe(200);

    const responseBody = await response.json();
    return responseBody.data || [];
  }

  async addCar(
    authCookie: string,
    brand?: string,
    model?: string,
    mileage?: number | string
  ) {
    const responseAddedCar = await this.request.post(
      "https://qauto.forstudy.space/api/cars",
      {
        data: {
          carBrandId: brand,
          carModelId: model,
          mileage: mileage,
        },
        headers: {
          Cookie: authCookie,
        },
      }
    );
    return responseAddedCar;
  }

  async deleteCarById(id: string, authCookie: string) {
    const responseDeletedCar = await this.request.delete(
      `https://qauto.forstudy.space/api/cars/${id}`,
      {
        headers: {
          Cookie: authCookie,
        },
      }
    );
    return responseDeletedCar;
  }

  async deleteAllCars(authCookie: string) {
    const allCars = await this.getCars(authCookie);

    if (!allCars.length) {
      console.log("No cars to delete");
      return;
    }

    for (let car of allCars) {
      const responseDeletedCar = await this.request.delete(
        `https://qauto.forstudy.space/api/cars/${car.id}`,
        {
          headers: {
            Cookie: authCookie,
          },
        }
      );

      if (responseDeletedCar.status() === 200) {
        console.log(`Car with ID ${car.id} deleted successfully.`);
      } else {
        console.log(`Failed to delete car with ID ${car.id}.`);
      }
    }
  }
}
