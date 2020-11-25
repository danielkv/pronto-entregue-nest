import { Module } from '@nestjs/common';
import { OrderProductRepositoryProvider } from './repositories/order-product.repository';

@Module({
    providers: [
        // repositories
        OrderProductRepositoryProvider,
    ],
})
export class OrderProductModule {}
