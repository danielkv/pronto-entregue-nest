import { IFilter } from 'src/modules/common/interfaces/IFilter';
import { Sale } from '../entities/sale.entity';
import { SaleFilterDTO } from '../dtos/sale.filter.dto';
import { QueryBuilderBase } from 'src/modules/common/repositories/query.builder.base';

export class SaleActiveFilter implements IFilter<Sale, SaleFilterDTO> {
    apply(query: QueryBuilderBase<Sale, SaleFilterDTO>, filter: SaleFilterDTO): QueryBuilderBase<Sale, SaleFilterDTO> {
        if (filter?.onlyActive === false) return query;

        // apply filter
        query.andWhere('sale.active');

        //return filter
        return query;
    }
}
