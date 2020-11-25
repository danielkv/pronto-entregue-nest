import { IRepositoryBase } from '../../common/interfaces/repository.base.interface';
import { Rating } from '../entities/rating.entity';

export interface IRatingRepository extends IRepositoryBase<Rating> {
    hide(ratingId: Rating['id']): Promise<any>;

    show(ratingId: Rating['id']): Promise<any>;
}
