import { Module } from '@nestjs/common';
import { CategoryFilterDTO } from './dtos/category.filter.dto';
import { CategoryActiveFilter } from './filters/category.active.filter';
import { CategoryCompanyFilter } from './filters/category.company.filter';
import { CategoryIdFilter } from './filters/category.id.filter';
import { CategorySearchFilter } from './filters/category.search.filter';
import { CategoryRepositoryProvider } from './repositories/category.repository';
import { ListCategoriesService } from './services/list-categories.service';

@Module({
    imports: [CategoryFilterDTO],
    providers: [
        // services
        ListCategoriesService,

        // filters
        CategoryActiveFilter,
        CategoryCompanyFilter,
        CategoryIdFilter,
        CategorySearchFilter,

        //repositories
        CategoryRepositoryProvider,
    ],
    exports: [ListCategoriesService],
})
export class CategoryModule {}
