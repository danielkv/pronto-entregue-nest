import { Module } from '@nestjs/common';
import { RatingFilterDTO } from './dtos/rating.filters.dto';
import { RatingRepositoryProvider } from './repositories/rating.repository';

@Module({
    imports: [RatingFilterDTO],
    providers: [
        // repositories
        RatingRepositoryProvider,
    ],
})
export class RatingModule {}
