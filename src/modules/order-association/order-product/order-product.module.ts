import { Module } from '@nestjs/common';
import { ProductModule } from 'src/modules/product-association/product/product.module';
import { OrderOptionGroupModule } from '../order-option-group/order-option-group.module';
import { OrderProductFilterDTO } from './dtos/order-product.filter.dto';
import { OrderProductOrderFilter } from './filters/order-product.order.filter';
import { OrderProductOptionsGroupsLoader } from './loaders/order-product-options-groups.loader';
import { OrderProductRelatedLoader } from './loaders/order-product-related.loader';
import { OrderProductRepositoryProvider } from './repositories/order-product.repository';
import { OrderProductOptionGroupResolver } from './resolvers/order-product-option-group.resolver';
import { OrderProductRelatedResolver } from './resolvers/order-product-related.resolver';
import { ListOrderProductsService } from './services/list-order-products.service';

@Module({
    imports: [OrderProductFilterDTO, ProductModule, OrderOptionGroupModule],
    providers: [
        // services
        ListOrderProductsService,

        // loaders
        OrderProductRelatedLoader,
        OrderProductOptionsGroupsLoader,

        // filters
        OrderProductOrderFilter,

        // resolvers
        OrderProductOptionGroupResolver,
        OrderProductRelatedResolver,

        // repositories
        OrderProductRepositoryProvider,
    ],
    exports: [ListOrderProductsService],
})
export class OrderProductModule {}
