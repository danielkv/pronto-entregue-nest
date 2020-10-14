import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { OrderOptionGroup } from '../../order-option-group/entities/order.option.group.entity';
import { OrderProduct } from '../entities/order.product.entity';
import { OrderProductOptionsGroupsLoader } from '../loaders/order-product-options-groups.loader';

@Resolver(() => OrderProduct)
export class OrderProductOptionGroupResolver {
    constructor(private orderProductOptionsGroupsLoader: OrderProductOptionsGroupsLoader) {}

    @ResolveField(() => [OrderOptionGroup])
    optionsGroups(@Parent() orderProduct: OrderProduct): Promise<OrderOptionGroup[]> {
        const orderProductId = orderProduct.id;

        return this.orderProductOptionsGroupsLoader.loader.load(orderProductId);
    }
}
