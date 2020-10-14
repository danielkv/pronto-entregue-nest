import { IFilter } from 'src/modules/common/interfaces/IFilter';
import { QueryBuilderBase } from 'src/modules/common/repositories/query.builder.base';
import { Brackets } from 'typeorm';
import { OptionFilterDTO } from '../dtos/option.filter.dto';
import { Option } from '../entities/option.entity';

export class OptionSearchFilter implements IFilter<Option, OptionFilterDTO> {
    apply(
        query: QueryBuilderBase<Option, OptionFilterDTO>,
        filter: OptionFilterDTO,
    ): QueryBuilderBase<Option, OptionFilterDTO> {
        if (filter?.search) return query;

        // apply filter
        query
            .andWhere(new Brackets(qb => qb.where('option.name LIKE :search')))
            .setParameters({ search: `%${filter.search}%` });

        //return filter
        return query;
    }
}
