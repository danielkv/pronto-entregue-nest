import { RepositoryBase } from 'src/modules/common/repositories/repository.base';
import { EntityRepository } from 'typeorm';
import { CategoryFilterDTO } from '../dtos/category.filter.dto';
import { Category } from '../entities/category.entity';
import { CategoryActiveFilter } from '../filters/category.active.filter';
import { CategoryCompanyFilter } from '../filters/category.company.filter';
import { CategorySearchFilter } from '../filters/category.search.filter';
import { CategoryIdFilter } from '../filters/category.id.filter';
import { RepositoryProviderFactory } from 'src/modules/common/helpers/repository-provider.factory';

@EntityRepository(Category)
export class CategoryRepository extends RepositoryBase<Category, CategoryFilterDTO> {
    constructor() {
        super();

        this.setFilters([
            new CategoryActiveFilter(),
            new CategorySearchFilter(),
            new CategoryCompanyFilter(),
            new CategoryIdFilter(),
        ]);
    }
}

export const CategoryRepositoryProvider = new RepositoryProviderFactory('ICategoryRepository', CategoryRepository).create();