import { Module } from '@nestjs/common';
import { OrderOptionGroupRepositoryProvider } from './repository/order-option-group.repository';

@Module({
    providers: [
        // repositories
        OrderOptionGroupRepositoryProvider,
    ],
})
export class OrderOptionGroupModule {}
