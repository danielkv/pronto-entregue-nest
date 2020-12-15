import { Controller, Get } from '@nestjs/common';
import { QueueEmailService } from '../services/queue-email.service';
import { SendEmailService } from '../services/send-email.service';

@Controller('mail')
export class MailController {
    constructor(private sendEmailService: SendEmailService, private queueEmailService: QueueEmailService) {}

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

    @Get('queue')
    queue() {
        this.queueEmailService.execute('new-password', {
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
