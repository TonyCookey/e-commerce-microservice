import { Controller } from '@nestjs/common';
import { EmailServiceService } from './email-service.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class EmailServiceController {
  constructor(private readonly emailServiceService: EmailServiceService) {}

  @MessagePattern('user-created')
  async sendEmail(email :string) {
    return this.emailServiceService.sendEmail(email)
  }
}
