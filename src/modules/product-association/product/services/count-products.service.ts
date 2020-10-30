import { Inject, Injectable } from '@nestjs/common';
import { ProductFilterDTO } from '../dtos/product.filter.dto';
import { ProductActiveFilter } from '../filters/product.active.filter';
import { ProductCategoryFilter } from '../filters/product.category.filter';
import { ProductCompanyFilter } from '../filters/product.company.filter';
import { ProductIdFilter } from '../filters/product.id.filter';
import { ProductSearchFilter } from '../filters/product.search.filter';
import { IProductRepository } from '../interface/product.repository.interface';
import { IProductFiltersOptions } from '../interface/product-filters-options.interface';

@Injectable()
export class CountProductsService {
    constructor(
        @Inject('IProductRepository')
        private productRepository: IProductRepository,
        private productActiveFilter: ProductActiveFilter,
        private productCategoryFilter: ProductCategoryFilter,
        private productCompanyFilter: ProductCompanyFilter,
        private productIdFilter: ProductIdFilter,
        private productSearchFilter: ProductSearchFilter,
    ) {}

    async execute(filter?: ProductFilterDTO): Promise<number> {
        const options: IProductFiltersOptions = {
            filter,
            filterHelpers: [
                this.productActiveFilter,
                this.productCategoryFilter,
                this.productCompanyFilter,
                this.productIdFilter,
                this.productSearchFilter,
            ],
        };

        return this.productRepository.getCount(options);
    }
}
