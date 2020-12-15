import { MailerModule } from '@nestjs-modules/mailer';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';
import { Module } from '@nestjs/common';
import { resolve } from 'path';
import { configService } from 'src/config/config.service';
import { SendEmailConsumer } from './consumers/mail.consumer';
import { MailQueueModule } from './queues/mail.queue';
import { QueueEmailService } from './services/queue-email.service';
import { SendEmailService } from './services/send-email.service';

@Module({
    imports: [
        MailerModule.forRoot({
            transport: configService.getMailerTransportConfig(),
            defaults: {
                from: `"${configService.getValue('EMAIL_DEFAULT_FROM_NAME')}" <${configService.getValue(
                    'EMAIL_DEFAULT_FROM_ADDRESS',
                )}>`,
            },
            template: {
                dir: resolve(__dirname, 'templates'),
                adapter: new PugAdapter(),
                options: {
                    strict: true,
                },
            },
        }),
        MailQueueModule,
    ],

    providers: [
        // services
        QueueEmailService,
        SendEmailService,

        // consumers
        SendEmailConsumer,
    ],
    exports: [MailQueueModule, QueueEmailService],
})
export class MailModule {}
