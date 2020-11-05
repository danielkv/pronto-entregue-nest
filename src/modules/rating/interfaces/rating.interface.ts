import { IRepositoryBase } from '../../common/interfaces/repository.base.interface';
import { RatingFilterDTO } from '../dtos/rating.filters.dto';
import { Rating } from '../entities/rating.entity';

export interface IRatingRepository extends IRepositoryBase<Rating, RatingFilterDTO> {
    hide(ratingId: Rating['id']): Promise<any>;

    show(ratingId: Rating['id']): Promise<any>;
}
