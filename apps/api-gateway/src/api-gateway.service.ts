import { Inject, Injectable } from '@nestjs/common';
import { LoginUserDto } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class ApiGatewayService {
  constructor(
    @Inject('USER_SERVICE') private readonly userService: ClientProxy
  ){}

  async registerUser(registerUserDto : RegisterUserDto) {
    return this.userService.send({cmd: 'register-user'}, registerUserDto)
  }
  async loginUser(loginUserDto : LoginUserDto) {
    return this.userService.send({cmd: 'login-user'}, loginUserDto)
  }
  async getUserDetails(id: number, token: string) {
    return this.userService.send({cmd: 'get-user-details'}, {id, token})
  }
}
