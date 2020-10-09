import { Module } from '@nestjs/common';
import { OrderOptionRepositoryProvider } from './repositories/order-option.repository';

@Module({ providers: [OrderOptionRepositoryProvider] })
export class OrderOptionModule {}
