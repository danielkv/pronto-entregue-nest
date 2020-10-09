import { Module } from '@nestjs/common';
import { OrderModule } from './order/order.module';
import { OrderOptionModule } from './order-option/order-option.module';
import { OrderOptionGroupModule } from './order-option-group/order-option-group.module';
import { OrderProductModule } from './order-product/order-product.module';

@Module({ imports: [OrderModule, OrderOptionModule, OrderOptionGroupModule, OrderProductModule] })
export class OrderAssociationModule {}
