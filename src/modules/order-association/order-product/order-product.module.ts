import { Module } from '@nestjs/common';
import { ProductModule } from 'src/modules/product/product.module';
import { OrderProductFilterDTO } from './dtos/order-product.filter.dto';
import { OrderProductOrderFilter } from './filters/order-product.order.filter';
import { OrderProductRelatedLoader } from './loaders/order-product-related.loader';
import { OrderProductLoader } from './loaders/order-product.loader';
import { OrderProductRepositoryProvider } from './repositories/order-product.repository';
import { OrderOrderProductResolver } from './resolvers/order-order-product.resolver';
import { OrderProductResolver } from './resolvers/order-product.resolver';
import { ListOrderProductsService } from './services/list-order-products.service';

@Module({
    imports: [OrderProductFilterDTO, ProductModule],
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
        OrderOrderProductResolver,

        // repositories
        OrderProductRepositoryProvider,
    ],
})
export class OrderProductModule {}
