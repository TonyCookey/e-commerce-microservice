import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';

@Module({
  providers: [AuthService],
  imports:[UserModule ,JwtModule.register({
    global: true,
    secret: jwtConstants.secret,
    signOptions: {
      expiresIn: '1d'
    }
  })],
  controllers: [AuthController]
})
export class AuthModule {}
