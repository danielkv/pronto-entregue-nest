import { IFilter } from 'src/modules/common/interfaces/IFilter';
import { QueryBuilderBase } from 'src/modules/common/repositories/query.builder.base';
import { Brackets } from 'typeorm';
import { OptionGroupFilterDTO } from '../dtos/option-group.filter.dto';
import { OptionGroup } from '../entities/option.group.entity';

export class OptionGroupSearchFilter implements IFilter<OptionGroup, OptionGroupFilterDTO> {
    apply(
        query: QueryBuilderBase<OptionGroup, OptionGroupFilterDTO>,
        filter: OptionGroupFilterDTO,
    ): QueryBuilderBase<OptionGroup, OptionGroupFilterDTO> {
        if (filter?.search) return query;

        // apply filter
        query
            .andWhere(new Brackets(qb => qb.where('option.name LIKE :search')))
            .setParameters({ search: `%${filter.search}%` });

        //return filter
        return query;
    }
}
