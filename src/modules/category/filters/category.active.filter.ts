import { Injectable } from '@nestjs/common';
import { IFilter } from '../../common/interfaces/IFilter';
import { QueryBuilderBase } from '../../common/repositories/query.builder.base';
import { CategoryFilterDTO } from '../dtos/category.filter.dto';
import { Category } from '../entities/category.entity';

@Injectable()
export class CategoryActiveFilter implements IFilter<Category, CategoryFilterDTO> {
    apply(
        query: QueryBuilderBase<Category, CategoryFilterDTO>,
        filter?: CategoryFilterDTO,
    ): QueryBuilderBase<Category, CategoryFilterDTO> {
        if (filter?.onlyActive === false) return query;

        return query.andWhere('category.active');
    }
}
