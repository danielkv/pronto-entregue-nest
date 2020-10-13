import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Product } from '../../../product/entities/product.entity';
import { OrderProduct } from '../entities/order.product.entity';
import { OrderProductRelatedLoader } from '../loaders/order-product-related.loader';

@Resolver(() => OrderProduct)
export class OrderProductRelatedResolver {
    constructor(private orderProductRelatedLoader: OrderProductRelatedLoader) {}

    @ResolveField(() => Product)
    productRelated(@Parent() orderProduct: OrderProduct): Promise<Product> {
        const productRelatedId = orderProduct.productRelatedId;

        return this.orderProductRelatedLoader.loader.load(productRelatedId);
    }
}
