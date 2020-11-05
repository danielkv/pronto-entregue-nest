import { IRepositoryListOptions } from '../../common/interfaces/IRepositoryListOptions';
import { RatingFilterDTO } from '../dtos/rating.filters.dto';
import { Rating } from '../entities/rating.entity';

export interface IRatingListOptions extends IRepositoryListOptions<Rating, RatingFilterDTO> {}
