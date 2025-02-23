import { test, expect } from "@playwright/test";
import AuthController from "../../controllers/AuthController";
import CarsController from "../../controllers/CarsController";

test.describe("Car tests", () => {
  let globalAuthHeader: string;
  let authController: AuthController;
  let carsController: CarsController;

  test.beforeEach(async ({ request }) => {
    authController = new AuthController(request);
    carsController = new CarsController(request);

    globalAuthHeader = await authController.signInAndGetCookie(process.env.ADMIN_USER_EMAIL ?? '', process.env.ADMIN_USER_PASSWORD ?? '')
    expect(globalAuthHeader).toBeDefined();
  });

  test.afterEach(async () => {
    await carsController.deleteAllCars(globalAuthHeader);
  })

  test("Add a car", async () => {
    const carsBefore = await carsController.getCars(globalAuthHeader);
    console.log("Cars before:", carsBefore.length);

    const responseAddedCar = await carsController.addCar(globalAuthHeader, '1', '1', 200);
    const responseAddedCarBody = await responseAddedCar.json();
    console.log("Response json:", responseAddedCarBody);


    expect(responseAddedCarBody.data).toBeDefined();
    expect(responseAddedCarBody.data.brand).toBe("Audi");
  
    const carsAfter = await carsController.getCars(globalAuthHeader);
    console.log("Cars after:", carsAfter.length);
  
    expect(carsAfter.length).toBe(carsBefore.length + 1);
  });

  test("Delete a car", async () => {
    const carsBefore = await carsController.getCars(globalAuthHeader);
    console.log("Cars before:", carsBefore.length);

    const responseAddedCar = await carsController.addCar(globalAuthHeader, '3', '12', 400);
    const responseAddedCarBody = await responseAddedCar.json();
    console.log("ResponseAddedCar: ", responseAddedCarBody);

    const carId = await responseAddedCarBody.data.id;

    const responseDeletedCar = await carsController.deleteCarById(carId, globalAuthHeader);
    const responseDeletedCarBody = await responseDeletedCar.json();

    expect(responseDeletedCarBody.data).toBeDefined();
    expect(responseDeletedCar.status()).toBe(200);
    expect(responseDeletedCarBody.data.carId).toBe(carId);
  
    const carsAfter = await carsController.getCars(globalAuthHeader);
    console.log("Cars after:", carsAfter.length);
    expect(carsAfter.length).toBe(carsBefore.length);
  });

  test("Car can't be added without model field", async () => {
    const responseAddedCar = await carsController.addCar(globalAuthHeader, '1', undefined , 200);
    const responseBody = await responseAddedCar.json();
    console.log("responseBody:", responseBody);

    expect(responseAddedCar.status()).toBe(400);
    expect(responseBody.status).toBe('error');
    expect(responseBody.message).toBe('Car model id is required');
  });

  test("Car can't be added with the wrong mileage type", async () => {
    const responseAddedCar = await carsController.addCar(globalAuthHeader, '1', '1' , 'abc');
    const responseBody = await responseAddedCar.json();
    console.log("responseBody:", responseBody);

    expect(responseAddedCar.status()).toBe(400);
    expect(responseBody.status).toBe('error');
    expect(responseBody.message).toBe('Invalid mileage type');
  });
});