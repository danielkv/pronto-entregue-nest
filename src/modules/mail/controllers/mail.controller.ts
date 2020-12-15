import { Controller, Get } from '@nestjs/common';
import { SendEmailService } from '../services/send-email.service';

@Controller('mail')
export class MailController {
    constructor(private sendEmailService: SendEmailService) {}

    @Get('send')
    send() {
        this.sendEmailService.execute('new-password', {
            to: 'daniel_kv@hotmail.com',
            subject: 'teste',
            data: {
                link: 'http://www.prontoentregue.com.br',
                user: {
                    firstName: 'Daniel',
                },
            },
        });
    }
}
