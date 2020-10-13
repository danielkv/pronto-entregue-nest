import { Module } from '@nestjs/common';
import { ProductModule } from 'src/modules/product/product.module';
import { OrderProductFilterDTO } from './dtos/order-product.filter.dto';
import { OrderProductOrderFilter } from './filters/order-product.order.filter';
import { OrderProductRelatedLoader } from './loaders/order-product-related.loader';
import { OrderProductRepositoryProvider } from './repositories/order-product.repository';
import { OrderProductRelatedResolver } from './resolvers/order-product-related.resolver';
import { ListOrderProductsService } from './services/list-order-products.service';

@Module({
    imports: [OrderProductFilterDTO, ProductModule],
    providers: [
        // services
        ListOrderProductsService,

        // loaders
        OrderProductRelatedLoader,

        // filters
        OrderProductOrderFilter,

        // resolvers
        OrderProductRelatedResolver,

        // repositories
        OrderProductRepositoryProvider,
    ],
    exports: [ListOrderProductsService],
})
export class OrderProductModule {}
