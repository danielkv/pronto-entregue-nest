import { Injectable } from '@nestjs/common';
import { IFilter } from '../../../common/interfaces/IFilter';
import { QueryBuilderBase } from '../../../common/repositories/query.builder.base';
import { Order } from '../entities/order.entity';
import { OrderFilterDTO } from '../dtos/order.filter.dto';

@Injectable()
export class OrderUserFilter implements IFilter<Order, OrderFilterDTO> {
    apply(
        query: QueryBuilderBase<Order, OrderFilterDTO>,
        filter?: OrderFilterDTO,
    ): QueryBuilderBase<Order, OrderFilterDTO> {
        if (!filter?.userId) return query;

        const userIds = !Array.isArray(filter.userId) ? [filter.userId] : filter.userId;

        if (!userIds.length) return query;

        return query.andWhere('order.userIds IN (:...userIds)').setParameters({
            userIds,
        });
    }
}
