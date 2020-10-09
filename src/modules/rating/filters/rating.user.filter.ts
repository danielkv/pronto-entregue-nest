import { IFilter } from '../../common/interfaces/IFilter';
import { QueryBuilderBase } from '../../common/repositories/query.builder.base';
import { RatingFilterDTO } from '../dtos/rating.filters.dto';
import { Rating } from '../entities/rating.entity';

export class RatingUserFilter implements IFilter<Rating, RatingFilterDTO> {
    apply(
        query: QueryBuilderBase<Rating, RatingFilterDTO>,
        filter: RatingFilterDTO,
    ): QueryBuilderBase<Rating, RatingFilterDTO> {
        if (!filter?.userId) return query;

        const userIds = !Array.isArray(filter.userId) ? [filter.userId] : filter.userId;

        // apply filter
        query.where('rating.userId IN (:...userIds)', { userIds });

        //return filter
        return query;
    }
}
