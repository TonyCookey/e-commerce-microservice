import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { HttpException, HttpStatus } from "@nestjs/common";
import { CreateUserDto } from '../user/dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from '../user/dto/login-user.dto';

@Injectable()

export class AuthService{
    constructor(
        private readonly usersService : UserService,
        private readonly jwtService : JwtService
    ){} 
    public async register(registerationData: CreateUserDto){
        const hashedPassword = await bcrypt.hash(registerationData.password, 10)
        try {
            const createdUser = await this.usersService.create({
                ...registerationData,
                password: hashedPassword
            });

            createdUser.password = undefined
            return createdUser
        } catch (error) {
           
            throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR)
            
        }
    }
    public async getAuthenticatedUser(loginUserDto: LoginUserDto) {
        try {
          const user = await this.usersService.getByEmail(loginUserDto.email)
          
          await this.verifyPassword(loginUserDto.password, user.password)
          return {
            access_token: await this.jwtService.signAsync({
              sub: user.id,
              email: user.email
            })
          }
        } catch (error) {
          console.log(error);
          
          throw new HttpException('Wrong credentials provided', HttpStatus.BAD_REQUEST)
        }
      }
       
      private async verifyPassword(plainTextPassword: string, hashedPassword: string) {
        const isPasswordMatching = await bcrypt.compare(plainTextPassword,hashedPassword)
        if (!isPasswordMatching) {
          throw new HttpException('Wrong credentials provided', HttpStatus.BAD_REQUEST)
        }
      }
}
