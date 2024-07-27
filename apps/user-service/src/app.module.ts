import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [UserModule, AuthModule, DatabaseModule, ConfigModule.forRoot({
    envFilePath: '.user.env',
    isGlobal: true
  })],
  controllers: [],
  providers: [],
})
export class AppModule {}
