import { QueryBuilderBase } from '../../common/repositories/query.builder.base';
import { Brackets } from 'typeorm';
import { IFilter } from '../../common/interfaces/IFilter';
import { ProductFilterDTO } from '../dtos/product.filter.dto';
import { Product } from '../entities/product.entity';

export class ProductSearchFilter implements IFilter<Product, ProductFilterDTO> {
    apply(
        query: QueryBuilderBase<Product, ProductFilterDTO>,
        filter: ProductFilterDTO,
    ): QueryBuilderBase<Product, ProductFilterDTO> {
        if (filter?.search) return query;

        // apply filter
        query.andWhere(
            new Brackets(qb =>
                qb
                    .where('product.name LIKE :search', { search: `%${filter.search}%` })
                    .orWhere('product.sku LIKE :search', { search: `%${filter.search}%` })
                    .orWhere('product.description LIKE :search', { search: `%${filter.search}%` })
                    .orWhere('product.id = :search', { search: filter.search }),
            ),
        );

        //return filter
        return query;
    }
}
