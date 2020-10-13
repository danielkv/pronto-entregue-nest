import { Inject, Injectable } from '@nestjs/common';
import { IRepositoryListOptions } from 'src/modules/common/interfaces/IRepositoryListOptions';
import { PageInfo } from 'src/modules/common/types/page-info';
import { CategoryFilterDTO } from '../dtos/category.filter.dto';
import { Category } from '../entities/category.entity';
import { CategoryActiveFilter } from '../filters/category.active.filter';
import { CategoryCompanyFilter } from '../filters/category.company.filter';
import { CategoryIdFilter } from '../filters/category.id.filter';
import { CategorySearchFilter } from '../filters/category.search.filter';
import { ICategoryRepository } from '../interfaces/category.repository.interface';

@Injectable()
export class ListCategoriesService {
    constructor(
        @Inject('ICategoryRepository') private categoryRepository: ICategoryRepository,
        private categoryActiveFilter: CategoryActiveFilter,
        private categoryCompanyFilter: CategoryCompanyFilter,
        private categoryIdFilter: CategoryIdFilter,
        private categorySearchFilter: CategorySearchFilter,
    ) {}

    execute(filter?: CategoryFilterDTO, pagination?: PageInfo): Promise<Category[]> {
        const options: IRepositoryListOptions<Category, CategoryFilterDTO> = {
            pagination,
            filter,
            filterHelpers: [
                this.categoryActiveFilter,
                this.categoryCompanyFilter,
                this.categoryIdFilter,
                this.categorySearchFilter,
            ],
        };

        return this.categoryRepository.getList(options);
    }
}
