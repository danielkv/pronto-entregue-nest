import { BullModuleOptions, BullOptionsFactory } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { configService } from 'src/config/config.service';

@Injectable()
export class NotificationQueueConfig implements BullOptionsFactory {
    createBullOptions(): BullModuleOptions {
        return {
            redis: {
                host: configService.getValue('REDIS_HOST', true),
                port: +configService.getValue('REDIS_PORT', true),
            },
        };
    }
}
