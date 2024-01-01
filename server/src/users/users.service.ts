import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UsersModel } from './entity/users.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UsersModel)
        private readonly usersRepository: Repository<UsersModel>,
    ) {}

    public async createUser(nickname: string, email: string, password: string) {
        const newUser = await this.usersRepository.create({
            nickname,
            email,
            password,
        });
        return await this.usersRepository.save(newUser);
    }

    public async readAllUsers() {
        return await this.usersRepository.find();
    }
}
