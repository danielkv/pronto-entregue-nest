import { Module } from '@nestjs/common';
import { OrderProductFilterDTO } from './dtos/order-product.filter.dto';
import { OrderProductOrderFilter } from './filters/order-product.order.filter';
import { OrderProductRelatedLoader } from './loaders/order-product-related.loader';
import { OrderProductLoader } from './loaders/order-product.loader';
import { OrderProductRepositoryProvider } from './repositories/order-product.repository';
import { OrderProductResolver } from './resolvers/order-product.resolver';
import { ListOrderProductsService } from './services/list-order-products.service';

@Module({
    imports: [OrderProductFilterDTO],
    providers: [
        // services
        ListOrderProductsService,

        // loaders
        OrderProductLoader,
        OrderProductRelatedLoader,

        // filters
        OrderProductOrderFilter,

        // resolvers
        OrderProductResolver,

        // repositories
        OrderProductRepositoryProvider,
    ],
})
export class OrderProductModule {}
