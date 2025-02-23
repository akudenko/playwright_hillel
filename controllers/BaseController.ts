import { APIRequestContext } from "@playwright/test";

export default class BaseController {
    protected request: APIRequestContext;

    constructor(request: APIRequestContext) {
        this.request = request;
      }
}