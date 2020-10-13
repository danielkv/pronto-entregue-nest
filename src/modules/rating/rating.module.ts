import { Module } from '@nestjs/common';
import { RatingFilterDTO } from './dtos/rating.filters.dto';
import { RatingCompanyFilter } from './filters/rating.company.filter';
import { RatingOrderFilter } from './filters/rating.order.filter';
import { RatingSearchFilter } from './filters/rating.search.filter';
import { RatingUserFilter } from './filters/rating.user.filter';
import { RatingRepositoryProvider } from './repositories/rating.repository';

@Module({
    imports: [RatingFilterDTO],
    providers: [
        // filters
        RatingCompanyFilter,
        RatingOrderFilter,
        RatingSearchFilter,
        RatingUserFilter,

        // repositories
        RatingRepositoryProvider,
    ],
})
export class RatingModule {}
