import { BullModule, InjectQueue } from '@nestjs/bull';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { Queue } from 'bull';
import { setQueues, UI } from 'bull-board';
import { NotificationModule } from '../notification/notification.module';
import { NotificationQueueConfig } from './queues/notification.queue';
import { QueueNotificationService } from './services/queue-notification.service';

@Module({
    imports: [
        // for processors
        NotificationModule,

        // queues
        BullModule.registerQueueAsync({
            name: 'notification',
            useClass: NotificationQueueConfig,
        }),
    ],
    providers: [
        // services
        QueueNotificationService,
    ],
})
export class QueueModule implements NestModule {
    constructor(@InjectQueue('notification') private notificationQueue: Queue) {
        setQueues([this.notificationQueue]);
    }

    configure(consumer: MiddlewareConsumer) {
        consumer.apply(UI).forRoutes('bull');
    }
}
