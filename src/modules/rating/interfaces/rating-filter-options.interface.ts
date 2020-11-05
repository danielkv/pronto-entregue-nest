import { IRepositoryFiltersOptions } from '../../common/interfaces/IRepositoryFiltersOptions';
import { RatingFilterDTO } from '../dtos/rating.filters.dto';
import { Rating } from '../entities/rating.entity';

export interface IRatingFilterOptions extends IRepositoryFiltersOptions<Rating, RatingFilterDTO> {}
