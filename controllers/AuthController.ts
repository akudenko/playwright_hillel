import BaseController from "./BaseController";

export default class AuthController extends BaseController{

    async signInAndGetCookie(email: string, password: string) {
        const responseAuth = await this.request.post(
            "https://qauto.forstudy.space/api/auth/signin",
            {
              data: {
                email: email,
                password: password,
                remember: false,
              },
            }
          );
          return responseAuth.headers()['set-cookie'].split(';')[0];
    }
}