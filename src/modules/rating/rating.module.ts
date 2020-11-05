import { Module } from '@nestjs/common';
import { RatingFilterDTO } from './dtos/rating.filters.dto';
import { RatingCompanyFilter } from './filters/rating.company.filter';
import { RatingOrderFilter } from './filters/rating.order.filter';
import { RatingSearchFilter } from './filters/rating.search.filter';
import { RatingUserFilter } from './filters/rating.user.filter';
import { RatingRepositoryProvider } from './repositories/rating.repository';
import { CreateRatingService } from './services/create-rating.service';
import { HideRatingService } from './services/hide-rating.service';
import { ShowRatingService } from './services/show-rating.service';
import { UpdateRatingService } from './services/update-rating.service';

@Module({
    imports: [RatingFilterDTO],
    providers: [
        // services
        CreateRatingService,
        UpdateRatingService,
        ShowRatingService,
        HideRatingService,

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
