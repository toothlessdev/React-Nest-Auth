import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post("signin")
    public signIn(
        @Body("email") email: string,
        @Body("password") password: string,
    ) {
        return this.authService.signIn(email, password);
    }

    @Post("signup")
    public signUp(
        @Body("nickname") nickname: string,
        @Body("email") email: string,
        @Body("password") password: string,
    ) {
        return this.authService.signUp(nickname, email, password);
    }
}
