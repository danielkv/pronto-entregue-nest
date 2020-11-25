import { Module } from '@nestjs/common';
import { OrderRepositoryProvider } from './repositories/order.repository';

@Module({
    providers: [
        // repositories
        OrderRepositoryProvider,
    ],
})
export class OrderModule {}
