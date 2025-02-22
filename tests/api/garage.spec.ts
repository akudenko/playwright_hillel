import { test, expect } from "@playwright/test";
import { getCars } from "../../utils/apiHelper";

test.describe("Positive car tests", () => {
  let globalAuthHeader: string;

  test.beforeEach(async ({ request }) => {
    const responseAuth = await request.post(
      "https://qauto.forstudy.space/api/auth/signin",
      {
        data: {
          email: "phpcarieer+1@gmail.com",
          password: "5ENM7.SttmBczLu",
          remember: false,
        },
      }
    );

    globalAuthHeader = responseAuth.headers()["set-cookie"].split(";")[0];
    expect(globalAuthHeader).toBeDefined();
  });

  test("Add a car", async ({ request }) => {
    const carsBefore = await getCars(request, globalAuthHeader);
    console.log("Cars before:", carsBefore.length);


    const responseAddedCar = await request.post(
      "https://qauto.forstudy.space/api/cars",
      {
        data: {
          carBrandId: 1,
          carModelId: 1,
          mileage: 200,
        },
        headers: {
          Cookie: globalAuthHeader,
        },
      }
    );

    const responseAddedCarBody = await responseAddedCar.json();
    console.log("Response:", responseAddedCarBody);

    expect(responseAddedCarBody.data).toBeDefined();
    expect(responseAddedCarBody.data.brand).toBe("Audi");
  
    const carsAfter = await getCars(request, globalAuthHeader);
    console.log("Cars after:", carsAfter.length);
  
    expect(carsAfter.length).toBe(carsBefore.length + 1);
  });

  test("Delete a car", async ({ request }) => {
    const carsBefore = await getCars(request, globalAuthHeader);
    console.log("Cars before:", carsBefore.length);

    const responseAddedCar = await request.post(
      "https://qauto.forstudy.space/api/cars",
      {
        data: {
          carBrandId: 3,
          carModelId: 12,
          mileage: 400,
        },
        headers: {
          Cookie: globalAuthHeader,
        },
      }
    );

    const responseAddedCarBody = await responseAddedCar.json();
    console.log("ResponseAddedCar: ", responseAddedCarBody);

    const carId = await responseAddedCarBody.data.id;

    const responseDeletedCar = await request.delete(
      `https://qauto.forstudy.space/api/cars/${carId}`, {
        headers: {
          Cookie: globalAuthHeader,
        },
      }
    );

    const responseDeletedCarBody = await responseDeletedCar.json();

    expect(responseDeletedCarBody.data).toBeDefined();
    expect(responseDeletedCar.status()).toBe(200);
    expect(responseDeletedCarBody.data.carId).toBe(carId);
  
    const carsAfter = await getCars(request, globalAuthHeader);
    console.log("Cars after:", carsAfter.length);
  
    expect(carsAfter.length).toBe(carsBefore.length);
  });

});


test.describe("Negative car tests", () => {
  let globalAuthHeader: string;

  test.beforeEach(async ({ request }) => {
    const responseAuth = await request.post(
      "https://qauto.forstudy.space/api/auth/signin",
      {
        data: {
          email: "phpcarieer+1@gmail.com",
          password: "5ENM7.SttmBczLu",
          remember: false,
        },
      }
    );

    globalAuthHeader = responseAuth.headers()["set-cookie"].split(";")[0];
    expect(globalAuthHeader).toBeDefined();
  });

  test("Car can't be added without model field", async ({ request }) => {
    const responseAddedCar = await request.post(
      "https://qauto.forstudy.space/api/cars",
      {
        data: {
          carBrandId: 1,
          mileage: 200,
        },
        headers: {
          Cookie: globalAuthHeader,
        },
      }
    );

    const responseBody = await responseAddedCar.json();
    console.log("responseBody:", responseBody);

    expect(responseAddedCar.status()).toBe(400);
    expect(responseBody.status).toBe('error');
    expect(responseBody.message).toBe('Car model id is required');
  });

  test("Car can't be added with the wrong mileage type", async ({ request }) => {
    const responseAddedCar = await request.post(
      "https://qauto.forstudy.space/api/cars",
      {
        data: {
          carBrandId: 1,
          carModelId: 1,
          mileage: 'abc',
        },
        headers: {
          Cookie: globalAuthHeader,
        },
      }
    );

    const responseBody = await responseAddedCar.json();
    console.log("responseBody:", responseBody);

    expect(responseAddedCar.status()).toBe(400);
    expect(responseBody.status).toBe('error');
    expect(responseBody.message).toBe('Invalid mileage type');
  });
});