import { Module } from '@nestjs/common';
import { SaleFilterDTO } from './dtos/sale.filter.dto';
import { SaleActiveFilter } from './filters/sale.active.filter';
import { SaleIdFilter } from './filters/sale.id.filter';
import { SaleSearchFilter } from './filters/sale.search.filter';
import { SaleRepositoryProvider } from './repositories/sale.repository';
import { GetSaleService } from './services/get-sale.service';

@Module({
    imports: [SaleFilterDTO],
    providers: [
        // services
        GetSaleService,

        // filters
        SaleActiveFilter,
        SaleIdFilter,
        SaleSearchFilter,

        //repositories
        SaleRepositoryProvider,
    ],
})
export class SaleModule {}
