import { IFilter } from '../../../common/interfaces/IFilter';
import { QueryBuilderBase } from '../../../common/repositories/query.builder.base';
import { OptionGroupFilterDTO } from '../dtos/option-group.filter.dto';
import { OptionGroup } from '../entities/option.group.entity';

export class OptionGroupActiveFilter implements IFilter<OptionGroup, OptionGroupFilterDTO> {
    apply(
        query: QueryBuilderBase<OptionGroup, OptionGroupFilterDTO>,
        filter: OptionGroupFilterDTO,
    ): QueryBuilderBase<OptionGroup, OptionGroupFilterDTO> {
        if (filter?.onlyActive === false) return query;

        // apply filter
        query.andWhere('optionGroup.active');

        //return filter
        return query;
    }
}
