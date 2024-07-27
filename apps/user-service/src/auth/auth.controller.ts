import { Controller, UseGuards } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LoginUserDto } from '../user/dto/login-user.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authSevice : AuthService
    ){}
    @MessagePattern({cmd : 'register-user'})
    create(createUserDto: CreateUserDto) {
        return this.authSevice.register(createUserDto);
    }
    @MessagePattern({cmd : 'login-user'})
    login(loginUserDto: LoginUserDto) {
        return this.authSevice.getAuthenticatedUser(loginUserDto);
    }
}
