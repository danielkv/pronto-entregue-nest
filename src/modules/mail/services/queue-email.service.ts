import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { IMailContext } from '../interfaces/mail-context.interface';

@Injectable()
export class QueueEmailService {
    constructor(@InjectQueue('mail') private readonly mailQueue: Queue) {}

    execute(template: string, context: IMailContext) {
        this.mailQueue.add({ template, context });
    }
}
