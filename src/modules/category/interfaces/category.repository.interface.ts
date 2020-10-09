import { IRepositoryBase } from 'src/modules/common/interfaces/repository.base.interface';
import { CategoryFilterDTO } from '../dtos/category.filter.dto';
import { Category } from '../entities/category.entity';

export interface ICategoryRepository extends IRepositoryBase<Category, CategoryFilterDTO> {}
