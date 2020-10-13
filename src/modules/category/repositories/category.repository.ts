import { RepositoryBase } from '../../common/repositories/repository.base';
import { EntityRepository } from 'typeorm';
import { CategoryFilterDTO } from '../dtos/category.filter.dto';
import { Category } from '../entities/category.entity';
import { RepositoryProviderFactory } from '../../common/helpers/repository-provider.factory';

@EntityRepository(Category)
export class CategoryRepository extends RepositoryBase<Category, CategoryFilterDTO> {}

export const CategoryRepositoryProvider = new RepositoryProviderFactory(
    'ICategoryRepository',
    CategoryRepository,
).create();
