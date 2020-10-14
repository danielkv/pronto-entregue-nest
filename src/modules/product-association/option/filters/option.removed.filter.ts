import { IFilter } from '../../../common/interfaces/IFilter';
import { QueryBuilderBase } from '../../../common/repositories/query.builder.base';
import { OptionFilterDTO } from '../dtos/option.filter.dto';
import { Option } from '../entities/option.entity';

export class OptionRemovedFilter implements IFilter<Option, OptionFilterDTO> {
    apply(
        query: QueryBuilderBase<Option, OptionFilterDTO>,
        filter: OptionFilterDTO,
    ): QueryBuilderBase<Option, OptionFilterDTO> {
        if (filter?.includeRemoved === false) return query;

        // apply filter
        query.andWhere('!option.removed');

        //return filter
        return query;
    }
}
