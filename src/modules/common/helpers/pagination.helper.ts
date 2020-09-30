import { Injectable } from '@nestjs/common';
import { SelectQueryBuilder } from 'typeorm';
import { PageInfo } from '../types/page-info';
import * as _ from 'lodash';

@Injectable()
export class PaginationHelper<Entity> {
    apply(query: SelectQueryBuilder<Entity>, pagination: PageInfo): SelectQueryBuilder<Entity> {
        if (!pagination || _.isEmpty(pagination)) return query;

        const { skip, page, take } = pagination;

        if (!skip || page) query.skip(skip || page * take);

        if (take) query.take(take);

        return query;
    }
}
