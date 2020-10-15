import { Module } from '@nestjs/common';
import { OptionGroupModule } from '../option-group/option-group.module';
import { ProductFilterDTO } from './dtos/product.filter.dto';
import { ProductActiveFilter } from './filters/product.active.filter';
import { ProductCategoryFilter } from './filters/product.category.filter';
import { ProductCompanyFilter } from './filters/product.company.filter';
import { ProductIdFilter } from './filters/product.id.filter';
import { ProductSearchFilter } from './filters/product.search.filter';
import { ProductOptionsGroupsLoader } from './loaders/product-options-groups.loader';
import { ProductRepositoryProvider } from './repositories/product.repository';
import { ProductOptionsGroupsResolver } from './resolvers/product-options-groups.resolver';
import { QueryProductResolver } from './resolvers/query-product.resolver';
import { GetProductsService } from './services/get-products.service';

@Module({
    imports: [ProductFilterDTO, OptionGroupModule],
    providers: [
        // services
        GetProductsService,

        // resolvers
        ProductOptionsGroupsResolver,
        QueryProductResolver,

        // loaders
        ProductOptionsGroupsLoader,

        // filters
        ProductActiveFilter,
        ProductCategoryFilter,
        ProductCompanyFilter,
        ProductIdFilter,
        ProductSearchFilter,

        // repositories
        ProductRepositoryProvider,
    ],
    exports: [GetProductsService],
})
export class ProductModule {}
