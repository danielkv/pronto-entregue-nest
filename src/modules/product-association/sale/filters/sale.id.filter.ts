import { IFilter } from 'src/modules/common/interfaces/IFilter';
import { QueryBuilderBase } from 'src/modules/common/repositories/query.builder.base';
import { SaleFilterDTO } from '../dtos/sale.filter.dto';
import { Sale } from '../entities/sale.entity';

export class SaleIdFilter implements IFilter<Sale, SaleFilterDTO> {
    async apply(
        query: QueryBuilderBase<Sale, SaleFilterDTO>,
        filter: SaleFilterDTO,
    ): Promise<QueryBuilderBase<Sale, SaleFilterDTO>> {
        if (!filter?.saleId) return query;

        // apply filter
        query.whereInIds(filter.saleId);

        //return filter
        return query;
    }
}
