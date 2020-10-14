import { IFilter } from 'src/modules/common/interfaces/IFilter';
import { QueryBuilderBase } from 'src/modules/common/repositories/query.builder.base';
import { OptionGroupFilterDTO } from '../dtos/option-group.filter.dto';
import { OptionGroup } from '../entities/option.group.entity';

export class OptionGroupIdFilter implements IFilter<OptionGroup, OptionGroupFilterDTO> {
    apply(
        query: QueryBuilderBase<OptionGroup, OptionGroupFilterDTO>,
        filter: OptionGroupFilterDTO,
    ): QueryBuilderBase<OptionGroup, OptionGroupFilterDTO> {
        if (!filter?.optionGroupId) return query;

        // apply filter
        query.whereInIds(filter.optionGroupId);

        //return filter
        return query;
    }
}
