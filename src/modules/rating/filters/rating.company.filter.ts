import { IFilter } from 'src/modules/common/interfaces/IFilter';
import { QueryBuilderBase } from 'src/modules/common/repositories/query.builder.base';
import { RatingFilterDTO } from '../dtos/rating.filters.dto';
import { Rating } from '../entities/rating.entity';

export class RatingCompanyFilter implements IFilter<Rating, RatingFilterDTO> {
    apply(
        query: QueryBuilderBase<Rating, RatingFilterDTO>,
        filter: RatingFilterDTO,
    ): QueryBuilderBase<Rating, RatingFilterDTO> {
        if (!filter?.companyId) return query;

        const companyIds = !Array.isArray(filter.companyId) ? [filter.companyId] : filter.companyId;

        // apply filter
        query.where('rating.companyId IN (:...companyIds)', { companyIds });

        //return filter
        return query;
    }
}
