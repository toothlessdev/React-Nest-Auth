import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { JWT_SECRET, TokenType } from "./const/token.const";
import { UsersService } from "src/users/users.service";

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly usersService: UsersService,
    ) {}

    public async signUp(nickname: string, email: string, password: string) {
        const newUser = await this.usersService.createUser(
            nickname,
            email,
            password,
        );
        return this.signIn(newUser.email, newUser.password);
    }

    public async signIn(email: string, password: string) {
        const user = await this.authenticate(email, password);
        return this.getToken(user.email);
    }

    public getToken(email: string) {
        return {
            accessToken: this.setToken(email, TokenType.ACCESS),
            refreshToken: this.setToken(email, TokenType.REFRESH),
        };
    }

    public setToken(email: string, type: TokenType) {
        const payload = {
            email: email,
            type: type,
        };
        return this.jwtService.sign(payload, {
            secret: JWT_SECRET,
            expiresIn: type === TokenType.REFRESH ? 3600 : 300,
        });
    }

    public async authenticate(email: string, password: string) {
        const user = await this.usersService.readUserByEmail(email);
        if (!user)
            throw new UnauthorizedException("존재하지 않는 사용자입니다");
        if (user.password !== password)
            throw new UnauthorizedException("비밀번호가 일치하지 않습니다");
        return user;
    }
}
