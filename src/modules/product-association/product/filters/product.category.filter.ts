import { QueryBuilderBase } from '../../../common/repositories/query.builder.base';
import { IFilter } from '../../../common/interfaces/IFilter';
import { ProductFilterDTO } from '../dtos/product.filter.dto';
import { Product } from '../entities/product.entity';

export class ProductCategoryFilter implements IFilter<Product, ProductFilterDTO> {
    async apply(
        query: QueryBuilderBase<Product, ProductFilterDTO>,
        filter: ProductFilterDTO,
    ): Promise<QueryBuilderBase<Product, ProductFilterDTO>> {
        if (!filter?.categoryId) return query;

        // check filter type
        const companyIds = !Array.isArray(filter.categoryId) ? [filter.categoryId] : filter.categoryId;

        // apply filter
        query.leftJoin('product.category', 'category').andWhere('category.id IN (:...companyIds)', { companyIds });

        //return filter
        return query;
    }
}
