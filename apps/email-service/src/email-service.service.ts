import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as SendGrid from '@sendgrid/mail';

@Injectable()
export class EmailServiceService {
  constructor(private readonly configService: ConfigService){
    SendGrid.setApiKey(this.configService.get<string>('SEND_GRID_KEY'))
  }
  sendEmail(email: string) {
    return SendGrid.send({
      to: email,
      subject: 'Registration Successful',
      from: this.configService.get<string>('SEND_GRID_EMAIL'),
      text : "Welcome to our E-Commerce",
      html: '<h1>Welcome</h1> <p> Thank you for registering <p>'

    })
  }
}
