import { Module } from '@nestjs/common';
import { OptionModule } from './option/option.module';
import { OptionGroupModule } from './option-group/option-group.module';
import { SaleModule } from './sale/sale.module';
import { ProductModule } from './product/product.module';

@Module({
    imports: [ProductModule, OptionModule, OptionGroupModule, SaleModule],
})
export class ProductAssociationModule {}
