import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import User from './entities/user.entity';
import { Repository } from 'typeorm';
import { ClientProxy } from '@nestjs/microservices';


@Injectable()
export class UserService{
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        @Inject('EMAIL_SERVICE') private readonly  emailService: ClientProxy

    ){}

    async getByEmail(email: string){
        const user = await this.usersRepository.findOne({where:{email}})
        if (user){
            return user
        }
        throw new HttpException('User with this email does not exist', HttpStatus.NOT_FOUND)
    }
    async getUserDetails(id: number){        
        const user = await this.usersRepository.findOneBy({id})
        user.password = undefined
        if (user){
            return user
        }
        throw new HttpException('User Not Found', HttpStatus.NOT_FOUND)
        return
    }

    async create(userData:CreateUserDto ){
        const newUser = await this.usersRepository.create(userData)
        await this.usersRepository.save(newUser)
        await this.emailService.send({cmd:'user-created'}, {})
        return newUser
    }
}