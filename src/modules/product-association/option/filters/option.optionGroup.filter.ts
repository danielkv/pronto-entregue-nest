import { IFilter } from 'src/modules/common/interfaces/IFilter';
import { QueryBuilderBase } from 'src/modules/common/repositories/query.builder.base';
import { OptionFilterDTO } from '../dtos/option.filter.dto';
import { Option } from '../entities/option.entity';

export class OptionOptionGroupFilter implements IFilter<Option, OptionFilterDTO> {
    async apply(
        query: QueryBuilderBase<Option, OptionFilterDTO>,
        filter: OptionFilterDTO,
    ): Promise<QueryBuilderBase<Option, OptionFilterDTO>> {
        if (!filter?.optionsGroupId) return query;

        // check filter type
        const optionsGroupIds = !Array.isArray(filter.optionsGroupId) ? [filter.optionsGroupId] : filter.optionsGroupId;

        // apply filter
        query.andWhere('option.optionsGroupId IN (:...optionsGroupIds)', { optionsGroupIds });

        //return filter
        return query;
    }
}
