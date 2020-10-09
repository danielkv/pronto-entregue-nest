import { Injectable } from '@nestjs/common';
import { Brackets } from 'typeorm';
import { QueryBuilderBase } from 'src/modules/common/repositories/query.builder.base';
import { Rating } from '../entities/rating.entity';
import { RatingFilterDTO } from '../dtos/rating.filters.dto';
import { IFilter } from 'src/modules/common/interfaces/IFilter';

@Injectable()
export class RatingSearchFilter implements IFilter<Rating, RatingFilterDTO> {
    apply(
        query: QueryBuilderBase<Rating, RatingFilterDTO>,
        filter?: any,
    ): QueryBuilderBase<Rating, RatingFilterDTO> {
        if (!filter?.search) return query;

        return query
            .andWhere(new Brackets(qb => qb.where('rating.comment LIKE :search')))
            .setParameters({
                search: `%${filter.search}%`,
            });
    }
}
