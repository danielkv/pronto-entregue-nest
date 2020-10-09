import { IFilter } from 'src/modules/common/interfaces/IFilter';
import { QueryBuilderBase } from 'src/modules/common/repositories/query.builder.base';
import { RatingFilterDTO } from '../dtos/rating.filters.dto';
import { Rating } from '../entities/rating.entity';

export class RatingOrderFilter implements IFilter<Rating, RatingFilterDTO> {
    apply(
        query: QueryBuilderBase<Rating, RatingFilterDTO>,
        filter: RatingFilterDTO,
    ): QueryBuilderBase<Rating, RatingFilterDTO> {
        if (!filter?.orderId) return query;

        const orderIds = !Array.isArray(filter.orderId) ? [filter.orderId] : filter.orderId;

        // apply filter
        query.where('rating.orderId IN (:...orderIds)', { orderIds });

        //return filter
        return query;
    }
}
