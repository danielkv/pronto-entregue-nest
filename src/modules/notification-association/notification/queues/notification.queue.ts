import { BullModule } from '@nestjs/bull';
import { BullConfig } from 'src/config/bull.config';

export const NotificationQueueModule = BullModule.registerQueueAsync({
    name: 'notification',
    useClass: BullConfig,
});
