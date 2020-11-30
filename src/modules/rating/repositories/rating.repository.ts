import { RepositoryBase } from '../../common/repositories/repository.base';
import { EntityRepository } from 'typeorm';
import { Rating } from '../entities/rating.entity';

@EntityRepository(Rating)
export class RatingRepository extends RepositoryBase<Rating> {
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
