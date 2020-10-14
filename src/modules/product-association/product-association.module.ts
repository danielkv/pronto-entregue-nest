import { Module } from '@nestjs/common';
import { OptionModule } from './option/option.module';
import { OptionGroupModule } from './option-group/option-group.module';
import { SaleModule } from './sale/sale.module';

@Module({
  imports: [OptionModule, OptionGroupModule, SaleModule]
})
export class ProductAssociationModule {}
