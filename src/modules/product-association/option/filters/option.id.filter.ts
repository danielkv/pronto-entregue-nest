import { IFilter } from 'src/modules/common/interfaces/IFilter';
import { QueryBuilderBase } from 'src/modules/common/repositories/query.builder.base';
import { OptionFilterDTO } from '../dtos/option.filter.dto';
import { Option } from '../entities/option.entity';

export class OptionIdFilter implements IFilter<Option, OptionFilterDTO> {
    apply(
        query: QueryBuilderBase<Option, OptionFilterDTO>,
        filter: OptionFilterDTO,
    ): QueryBuilderBase<Option, OptionFilterDTO> {
        if (!filter?.optionId) return query;

        // apply filter
        query.whereInIds(filter.optionId);

        //return filter
        return query;
    }
}
