import { Module } from '@nestjs/common';
import { ProductFilterDTO } from './dtos/product.filter.dto';
import { ProductRepositoryProvider } from './repositories/product.repository';
import { GetProductsService } from './services/get-products.service';

@Module({
    imports: [ProductFilterDTO],
    providers: [
        // services
        GetProductsService,

        // repositories
        ProductRepositoryProvider,
    ],
    exports: [GetProductsService],
})
export class ProductModule {}
