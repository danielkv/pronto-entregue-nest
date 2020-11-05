import { Inject, Injectable } from '@nestjs/common';
import { RatingFilterDTO } from '../dtos/rating.filters.dto';
import { RatingCompanyFilter } from '../filters/rating.company.filter';
import { RatingOrderFilter } from '../filters/rating.order.filter';
import { RatingSearchFilter } from '../filters/rating.search.filter';
import { RatingUserFilter } from '../filters/rating.user.filter';
import { IRatingFilterOptions } from '../interfaces/rating-filter-options.interface';
import { IRatingRepository } from '../interfaces/rating.interface';

@Injectable()
export class CountRatingsService {
    constructor(
        @Inject('IRatingRepository') private ratingRepository: IRatingRepository,
        private ratingCompanyFilter: RatingCompanyFilter,
        private ratingOrderFilter: RatingOrderFilter,
        private ratingSearchFilter: RatingSearchFilter,
        private ratingUserFilter: RatingUserFilter,
    ) {}

    execute(filter?: RatingFilterDTO): Promise<number> {
        const options: IRatingFilterOptions = {
            filter,
            filterHelpers: [
                this.ratingCompanyFilter,
                this.ratingOrderFilter,
                this.ratingSearchFilter,
                this.ratingUserFilter,
            ],
        };

        return this.ratingRepository.getCount(options);
    }
}
