import { Body, Controller, Get, Param, Post, Request } from '@nestjs/common';
import { ApiGatewayService } from './api-gateway.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Controller()
export class ApiGatewayController {
  constructor(
    private readonly apiGatewayService: ApiGatewayService
  ) {}

  @Get('hello')
  hello(){
    return 'hello'
  }
  @Post('register')
  async registerUser(@Body() registerUserDto : RegisterUserDto) {
    return this.apiGatewayService.registerUser(registerUserDto);
  }
  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    return this.apiGatewayService.loginUser(loginUserDto);
  }
  @Get('users/:id')
  async getUserDetails(@Param('id') id: number, @Request() request: Request) {
    const access_token = request.headers["authorization"].split(' ')[1]
    return this.apiGatewayService.getUserDetails(id, access_token);
  }
}