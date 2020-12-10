import { BullModule, BullModuleOptions, BullOptionsFactory } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { configService } from 'src/config/config.service';
import { resolve } from 'path';

@Injectable()
class NotificationQueueConfig implements BullOptionsFactory {
    createBullOptions(): BullModuleOptions {
        return {
            redis: {
                host: configService.getValue('REDIS_HOST', true),
                port: +configService.getValue('REDIS_PORT', true),
            },
            processors: [resolve(__dirname, '..', 'processors', 'notification.processor.js')], // converted .js file
        };
    }
}

export const NotificationQueueModule = BullModule.registerQueueAsync({
    name: 'notification',
    useClass: NotificationQueueConfig,
});
