import { IFilter } from 'src/modules/common/interfaces/IFilter';
import { QueryBuilderBase } from 'src/modules/common/repositories/query.builder.base';
import { Brackets } from 'typeorm';
import { SaleFilterDTO } from '../dtos/sale.filter.dto';
import { Sale } from '../entities/sale.entity';

export class SaleSearchFilter implements IFilter<Sale, SaleFilterDTO> {
    apply(query: QueryBuilderBase<Sale, SaleFilterDTO>, filter: SaleFilterDTO): QueryBuilderBase<Sale, SaleFilterDTO> {
        if (filter?.search) return query;

        // apply filter
        query
            .andWhere(new Brackets(qb => qb.where('sale.name LIKE :search').orWhere('sale.description LIKE :search')))
            .setParameters({ search: `%${filter.search}%` });

        //return filter
        return query;
    }
}
