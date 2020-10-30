import { Inject, Injectable } from '@nestjs/common';

import { PageInfo } from '../../../common/types/page-info';

import { Product } from '../entities/product.entity';
import { ProductFilterDTO } from '../dtos/product.filter.dto';
import { IProductListOptions } from '../interface/product-list-options.interface';
import { ProductActiveFilter } from '../filters/product.active.filter';
import { ProductCategoryFilter } from '../filters/product.category.filter';
import { ProductCompanyFilter } from '../filters/product.company.filter';
import { ProductIdFilter } from '../filters/product.id.filter';
import { ProductSearchFilter } from '../filters/product.search.filter';
import { IProductRepository } from '../interface/product.repository.interface';

@Injectable()
export class ListProductsService {
    constructor(
        @Inject('IProductRepository')
        private productRepository: IProductRepository,
        private productActiveFilter: ProductActiveFilter,
        private productCategoryFilter: ProductCategoryFilter,
        private productCompanyFilter: ProductCompanyFilter,
        private productIdFilter: ProductIdFilter,
        private productSearchFilter: ProductSearchFilter,
    ) {}

    async execute(filter?: ProductFilterDTO, pagination?: PageInfo): Promise<Product[]> {
        const options: IProductListOptions = {
            pagination,
            filter,
            filterHelpers: [
                this.productActiveFilter,
                this.productCategoryFilter,
                this.productCompanyFilter,
                this.productIdFilter,
                this.productSearchFilter,
            ],
        };

        return this.productRepository.getList(options);
    }
}
