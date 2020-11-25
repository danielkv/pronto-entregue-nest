import { Module } from '@nestjs/common';
import { SaleFilterDTO } from './dtos/sale.filter.dto';
import { SaleRepositoryProvider } from './repositories/sale.repository';

@Module({
    imports: [SaleFilterDTO],
    providers: [
        //repositories
        SaleRepositoryProvider,
    ],
})
export class SaleModule {}
