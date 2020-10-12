import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Order } from '../../order/entities/order.entity';
import { OrderProduct } from '../../order/interfaces/order.product.entity';
import { OrderProductLoader } from '../loaders/order-product.loader';

@Resolver(() => Order)
export class OrderOrderProductResolver {
    constructor(private orderProductLoader: OrderProductLoader) {}
    @ResolveField(() => [OrderProduct])
    products(@Parent() order: Order): Promise<OrderProduct[]> {
        const orderId = order.id;

        return this.orderProductLoader.loader.load(orderId);
    }
}
