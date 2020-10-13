import { RepositoryProviderFactory } from '../../common/helpers/repository-provider.factory';
import { RepositoryBase } from '../../common/repositories/repository.base';
import { EntityRepository } from 'typeorm';
import { RatingFilterDTO } from '../dtos/rating.filters.dto';
import { Rating } from '../entities/rating.entity';
import { IRatingRepository } from '../interfaces/rating.interface';

@EntityRepository(Rating)
export class RatingRepository extends RepositoryBase<Rating, RatingFilterDTO> implements IRatingRepository {
    constructor() {
        super();

        this.setQueryBuilderTableName('rating');
    }
}

export const RatingRepositoryProvider = new RepositoryProviderFactory('IRatingRepository', RatingRepository).create();
