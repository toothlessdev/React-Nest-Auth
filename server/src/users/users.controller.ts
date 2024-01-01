import { Controller, Post, Body, Get } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    public createUser(
        @Body('nickname') nickname: string,
        @Body('email') email: string,
        @Body('password') password: string,
    ) {
        return this.usersService.createUser(nickname, email, password);
    }

    @Get()
    public readAllUsers() {
        return this.usersService.readAllUsers();
    }
}
