import { BullModule } from '@nestjs/bull';
import { BullConfig } from 'src/config/bull.config';

export const MailQueueModule = BullModule.registerQueueAsync({
    name: 'mail',
    useClass: BullConfig,
});
