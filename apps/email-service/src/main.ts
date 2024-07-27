import { NestFactory } from '@nestjs/core';
import { EmailServiceModule } from './email-service.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(EmailServiceModule, {
    transport: Transport.TCP,
    options:{
      port:3002
    }
  });
  await app.listen();
}
bootstrap();
