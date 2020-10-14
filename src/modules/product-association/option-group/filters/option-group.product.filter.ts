import { IFilter } from 'src/modules/common/interfaces/IFilter';
import { QueryBuilderBase } from 'src/modules/common/repositories/query.builder.base';
import { OptionGroupFilterDTO } from '../dtos/option-group.filter.dto';
import { OptionGroup } from '../entities/option.group.entity';

export class OptionGroupProductFilter implements IFilter<OptionGroup, OptionGroupFilterDTO> {
    async apply(
        query: QueryBuilderBase<OptionGroup, OptionGroupFilterDTO>,
        filter: OptionGroupFilterDTO,
    ): Promise<QueryBuilderBase<OptionGroup, OptionGroupFilterDTO>> {
        if (!filter?.productId) return query;

        // check filter type
        const productIds = !Array.isArray(filter.productId) ? [filter.productId] : filter.productId;

        // apply filter
        query.andWhere('optionGroup.productId IN (:...productIds)', { productIds });

        //return filter
        return query;
    }
}
