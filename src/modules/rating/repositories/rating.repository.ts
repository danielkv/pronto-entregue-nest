import { RepositoryProviderFactory } from 'src/modules/common/helpers/repository-provider.factory';
import { RepositoryBase } from 'src/modules/common/repositories/repository.base';
import { EntityRepository } from 'typeorm';
import { RatingFilterDTO } from '../dtos/rating.filters.dto';
import { Rating } from '../entities/rating.entity';
import { RatingCompanyFilter } from '../filters/rating.company.filter';
import { RatingOrderFilter } from '../filters/rating.order.filter';
import { RatingSearchFilter } from '../filters/rating.search.filter';
import { RatingUserFilter } from '../filters/rating.user.filter';
import { IRatingRepository } from '../interfaces/rating.interface';

@EntityRepository(Rating)
export class RatingRepository extends RepositoryBase<Rating, RatingFilterDTO>
    implements IRatingRepository {
    constructor() {
        super();

        this.setQueryBuilderTableName('rating');

        this.setFilters([
            new RatingUserFilter(),
            new RatingCompanyFilter(),
            new RatingOrderFilter(),
            new RatingSearchFilter(),
        ]);
    }
}

export const RatingRepositoryProvider = new RepositoryProviderFactory(
    'IRatingRepository',
    RatingRepository,
).create();
