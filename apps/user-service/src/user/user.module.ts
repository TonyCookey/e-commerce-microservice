import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import User from './entities/user.entity';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [TypeOrmModule.forFeature([User]),  ClientsModule.register([
    { name: 'EMAIL_SERVICE', transport: Transport.TCP, options: {port : 3002} },
  ]),],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
