import { Inject, Injectable } from '@nestjs/common';
import { PageInfo } from 'src/modules/common/types/page-info';
import { RatingFilterDTO } from '../dtos/rating.filters.dto';
import { Rating } from '../entities/rating.entity';
import { RatingCompanyFilter } from '../filters/rating.company.filter';
import { RatingOrderFilter } from '../filters/rating.order.filter';
import { RatingSearchFilter } from '../filters/rating.search.filter';
import { RatingUserFilter } from '../filters/rating.user.filter';
import { IRatingListOptions } from '../interfaces/rating-list-options.interface';
import { IRatingRepository } from '../interfaces/rating.interface';

@Injectable()
export class ListRatingsService {
    constructor(
        @Inject('IRatingRepository') private ratingRepository: IRatingRepository,
        private ratingCompanyFilter: RatingCompanyFilter,
        private ratingOrderFilter: RatingOrderFilter,
        private ratingSearchFilter: RatingSearchFilter,
        private ratingUserFilter: RatingUserFilter,
    ) {}

    execute(filter?: RatingFilterDTO, pagination?: PageInfo): Promise<Rating[]> {
        const options: IRatingListOptions = {
            pagination,
            filter,
            filterHelpers: [
                this.ratingCompanyFilter,
                this.ratingOrderFilter,
                this.ratingSearchFilter,
                this.ratingUserFilter,
            ],
            orderBy: {
                'rating.createdAt': 'DESC',
            },
        };

        return this.ratingRepository.getList(options);
    }
}
