import { Module } from '@nestjs/common';
import { DeliveryAreaRepositoryProvider } from './repositories/delivery.area.repository';

@Module({
    providers: [
        // repositories
        DeliveryAreaRepositoryProvider,
    ],
})
export class DeliveryAreaModule {}
