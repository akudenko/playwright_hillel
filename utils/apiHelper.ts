import { APIRequestContext, expect } from "@playwright/test";

export async function getCars(request: APIRequestContext, authCookie: string) {
    const response = await request.get("https://qauto.forstudy.space/api/cars", {
      headers: {
        Cookie: authCookie,
      },
    });
  
    expect(response.status()).toBe(200);
  
    const responseBody = await response.json();
    return responseBody.data || [];
  }