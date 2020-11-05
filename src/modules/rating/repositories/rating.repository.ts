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

    hide(ratingId: Rating['id']): Promise<any> {
        const query = this.createQueryBuilder(this.tablename);

        query
            .update()
            .set({ hidden: true })
            .whereInIds(ratingId);

        return query.execute();
    }

    show(ratingId: Rating['id']): Promise<any> {
        const query = this.createQueryBuilder(this.tablename);

        query
            .update()
            .set({ hidden: false })
            .whereInIds(ratingId);

        return query.execute();
    }
}

export const RatingRepositoryProvider = new RepositoryProviderFactory('IRatingRepository', RatingRepository).create();
