import { Module } from '@nestjs/common';
import { DeliveryRepositoryProvider } from './repositories/delivery.repository';

@Module({
    providers: [DeliveryRepositoryProvider],
})
export class DeliveryModule {}
