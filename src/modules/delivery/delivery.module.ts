import { Module } from '@nestjs/common';
import { DeliverySearchFilter } from './filters/delivery.search.filter';
import { DeliveryRepositoryProvider } from './repositories/delivery.repository';

@Module({
    providers: [
        // filters
        DeliverySearchFilter,

        // respositories
        DeliveryRepositoryProvider,
    ],
})
export class DeliveryModule {}
