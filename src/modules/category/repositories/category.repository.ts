import { RepositoryBase } from 'src/modules/common/repositories/repository.base';
import { Connection, EntityRepository } from 'typeorm';
import { CategoryFilterDTO } from '../dtos/category.filter.dto';
import { Category } from '../entities/category.entity';
import { CategoryActiveFilter } from '../filters/category.active.filter';
import { CategoryCompanyFilter } from '../filters/category.company.filter';
import { CategorySearchFilter } from '../filters/category.search.filter';
import { CategoryIdFilter } from '../filters/category.id.filter';
import { FactoryProvider } from '@nestjs/common';

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

export const CategoryRepositoryProvider: FactoryProvider<CategoryRepository> = {
    provide: 'ICategoryRepository',
    useFactory: (connection: Connection) => connection.getCustomRepository(CategoryRepository),
    inject: [Connection],
};
