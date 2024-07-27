import { Module } from '@nestjs/common';
import { ApiGatewayController } from './api-gateway.controller';
import { ApiGatewayService } from './api-gateway.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [ 
    ClientsModule.register([
      { name: 'USER_SERVICE', transport: Transport.TCP, options: {port : 3001} },
    ]),
    ThrottlerModule.forRoot([{
      ttl: 60000,
      limit: 10,
    }]),
  ],
  
  controllers: [ApiGatewayController],
  providers: [ApiGatewayService, {provide: APP_GUARD, useClass: ThrottlerGuard}],
})
export class ApiGatewayModule {}
