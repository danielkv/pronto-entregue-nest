import { Module } from '@nestjs/common';
import { DeliveryRepositoryProvider } from './repositories/delivery.repository';

@Module({
    providers: [
        // respositories
        DeliveryRepositoryProvider,
    ],
})
export class DeliveryModule {}
