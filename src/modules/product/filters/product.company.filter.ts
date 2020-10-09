import { QueryBuilderBase } from '../../common/repositories/query.builder.base';
import { IFilter } from '../../common/interfaces/IFilter';
import { ProductFilterDTO } from '../dtos/product.filter.dto';
import { Product } from '../entities/product.entity';

export class ProductCompanyFilter implements IFilter<Product, ProductFilterDTO> {
    async apply(
        query: QueryBuilderBase<Product, ProductFilterDTO>,
        filter: ProductFilterDTO,
    ): Promise<QueryBuilderBase<Product, ProductFilterDTO>> {
        if (!filter?.companyId) return query;

        // check filter type
        const companyIds = !Array.isArray(filter.companyId) ? [filter.companyId] : filter.companyId;

        // apply filter
        query
            .leftJoin('product.company', 'company')
            .andWhere('company.id IN (:...companyIds)', { companyIds });

        //return filter
        return query;
    }
}
