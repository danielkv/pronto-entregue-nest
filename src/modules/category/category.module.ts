import { Module } from '@nestjs/common';
import { CompanyModule } from '../company-association/company/company.module';
import { CategoryFilterDTO } from './dtos/category.filter.dto';
import { CategoryActiveFilter } from './filters/category.active.filter';
import { CategoryCompanyFilter } from './filters/category.company.filter';
import { CategoryIdFilter } from './filters/category.id.filter';
import { CategorySearchFilter } from './filters/category.search.filter';
import { CategoryRepositoryProvider } from './repositories/category.repository';
import { CreateCategoryService } from './services/create-category.service';
import { ListCategoriesService } from './services/list-categories.service';
import { UpdateCategoryService } from './services/update-category.service';

@Module({
    imports: [CategoryFilterDTO, CompanyModule],
    providers: [
        // services
        ListCategoriesService,
        CreateCategoryService,
        UpdateCategoryService,

        // filters
        CategoryActiveFilter,
        CategoryCompanyFilter,
        CategoryIdFilter,
        CategorySearchFilter,

        //repositories
        CategoryRepositoryProvider,
    ],
    exports: [ListCategoriesService, CreateCategoryService, UpdateCategoryService],
})
export class CategoryModule {}
