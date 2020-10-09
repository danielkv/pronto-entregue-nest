import { Module } from '@nestjs/common';
import { OrderOptionGroupRepositoryProvider } from './repository/order-option-group.repository';

@Module({ providers: [OrderOptionGroupRepositoryProvider] })
export class OrderOptionGroupModule {}
