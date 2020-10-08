import { QueryBuilderBase } from 'src/modules/common/repositories/query.builder.base';
import { IFilter } from '../../common/interfaces/IFilter';
import { CategoryFilterDTO } from '../dtos/category.filter.dto';
import { Category } from '../entities/category.entity';

export class CategoryIdFilter implements IFilter<Category, CategoryFilterDTO> {
    async apply(
        query: QueryBuilderBase<Category, CategoryFilterDTO>,
        filter: CategoryFilterDTO,
    ): Promise<QueryBuilderBase<Category, CategoryFilterDTO>> {
        if (!filter?.categoryId) return query;

        // check filter type
        const categoryIds = !Array.isArray(filter.categoryId)
            ? [filter.categoryId]
            : filter.categoryId;

        // apply filter
        query.andWhere('category.id IN (:...categoryIds)', { categoryIds });

        //return filter
        return query;
    }
}
