import { QueryBuilderBase } from '../../common/repositories/query.builder.base';
import { IFilter } from '../../common/interfaces/IFilter';
import { ProductFilterDTO } from '../dtos/product.filter.dto';
import { Product } from '../entities/product.entity';

export class ProductIdFilter implements IFilter<Product, ProductFilterDTO> {
    apply(
        query: QueryBuilderBase<Product, ProductFilterDTO>,
        filter: ProductFilterDTO,
    ): QueryBuilderBase<Product, ProductFilterDTO> {
        if (!filter?.productId) return query;

        // apply filter
        query.whereInIds(filter.productId);

        //return filter
        return query;
    }
}
