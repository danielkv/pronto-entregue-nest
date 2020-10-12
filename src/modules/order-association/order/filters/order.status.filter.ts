import { Injectable } from '@nestjs/common';
import { IFilter } from '../../../common/interfaces/IFilter';
import { QueryBuilderBase } from '../../../common/repositories/query.builder.base';
import { Order } from '../entities/order.entity';
import { OrderFilterDTO } from '../dtos/order.filter.dto';

@Injectable()
export class OrderStatusFilter implements IFilter<Order, OrderFilterDTO> {
    apply(
        query: QueryBuilderBase<Order, OrderFilterDTO>,
        filter?: OrderFilterDTO,
    ): QueryBuilderBase<Order, OrderFilterDTO> {
        if (!filter?.status?.length) return query;

        return query.andWhere('order.status IN (:...status)').setParameters({
            status: filter.status,
        });
    }
}
