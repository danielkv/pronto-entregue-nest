import { Module } from '@nestjs/common';
import { ProductFilterDTO } from './dtos/product.filter.dto';
import { ProductActiveFilter } from './filters/product.active.filter';
import { ProductCategoryFilter } from './filters/product.category.filter';
import { ProductCompanyFilter } from './filters/product.company.filter';
import { ProductIdFilter } from './filters/product.id.filter';
import { ProductSearchFilter } from './filters/product.search.filter';
import { ProductRepositoryProvider } from './repositories/product.repository';
import { GetProductsService } from './services/get-products.service';

@Module({
    imports: [ProductFilterDTO],
    providers: [
        // services
        GetProductsService,

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
