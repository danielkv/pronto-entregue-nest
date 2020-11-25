import { Module } from '@nestjs/common';
import { OptionGroupModule } from '../option-group/option-group.module';
import { ProductFilterDTO } from './dtos/product.filter.dto';
import { ProductRepositoryProvider } from './repositories/product.repository';
import { ProductDTO } from './dtos/product.dto';

@Module({
    imports: [ProductFilterDTO, OptionGroupModule, ProductDTO],
    providers: [
        // repositories
        ProductRepositoryProvider,
    ],
})
export class ProductModule {}
