import { Injectable } from '@nestjs/common';
import { IFilter } from '../../common/interfaces/IFilter';
import { QueryBuilderBase } from '../../common/repositories/query.builder.base';
import { Order } from '../entities/order.entity';
import { OrderFilterDTO } from '../dtos/order.filter.dto';

@Injectable()
export class OrderTypeFilter implements IFilter<Order, OrderFilterDTO> {
    apply(
        query: QueryBuilderBase<Order, OrderFilterDTO>,
        filter?: OrderFilterDTO,
    ): QueryBuilderBase<Order, OrderFilterDTO> {
        if (!filter?.type) return query;

        return query.andWhere('order.type IN (:...type)').setParameters({
            type: filter.type,
        });
    }
}
