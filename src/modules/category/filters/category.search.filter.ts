import { IFilter } from '../../common/interfaces/IFilter';
import { Brackets } from 'typeorm';
import { QueryBuilderBase } from '../../common/repositories/query.builder.base';
import { Category } from '../entities/category.entity';
import { CategoryFilterDTO } from '../dtos/category.filter.dto';

export class CategorySearchFilter implements IFilter<Category, CategoryFilterDTO> {
    apply(
        query: QueryBuilderBase<Category, CategoryFilterDTO>,
        filter?: any,
    ): QueryBuilderBase<Category, CategoryFilterDTO> {
        if (!filter?.search) return query;

        return query.andWhere(
            new Brackets(qb =>
                qb
                    .where('category.name LIKE :search', {
                        search: `%${filter.search}%`,
                    })
                    .orWhere('category.description LIKE :search', {
                        search: `%${filter.search}%`,
                    }),
            ),
        );
    }
}
