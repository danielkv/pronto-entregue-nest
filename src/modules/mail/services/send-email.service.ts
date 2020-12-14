import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ObjectLike } from 'src/modules/common/interfaces/object.interface';
import { IMailContext } from '../interfaces/mail-context.interface';

@Injectable()
export class SendEmailService {
    constructor(private readonly mailerService: MailerService) {}

    execute(template: string, context: IMailContext) {
        return this.mailerService.sendMail({
            to: context.to,
            from: context?.from,
            template,
            context: context.data,
        });
    }
}
