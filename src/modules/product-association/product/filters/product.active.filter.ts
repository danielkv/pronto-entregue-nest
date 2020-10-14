import { QueryBuilderBase } from '../../../common/repositories/query.builder.base';
import { IFilter } from '../../../common/interfaces/IFilter';
import { ProductFilterDTO } from '../dtos/product.filter.dto';
import { Product } from '../entities/product.entity';

export class ProductActiveFilter implements IFilter<Product, ProductFilterDTO> {
    apply(
        query: QueryBuilderBase<Product, ProductFilterDTO>,
        filter: ProductFilterDTO,
    ): QueryBuilderBase<Product, ProductFilterDTO> {
        if (filter?.onlyActive === false) return query;

        // apply filter
        query.andWhere('product.active');

        //return filter
        return query;
    }
}
