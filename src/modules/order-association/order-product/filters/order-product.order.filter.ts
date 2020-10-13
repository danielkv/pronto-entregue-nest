import { Injectable } from '@nestjs/common';
import { IFilter } from '../../../common/interfaces/IFilter';
import { QueryBuilderBase } from '../../../common/repositories/query.builder.base';
import { OrderProduct } from '../entities/order.product.entity';
import { OrderProductFilterDTO } from '../dtos/order-product.filter.dto';

@Injectable()
export class OrderProductOrderFilter implements IFilter<OrderProduct, OrderProductFilterDTO> {
    apply(
        query: QueryBuilderBase<OrderProduct, OrderProductFilterDTO>,
        filter?: OrderProductFilterDTO,
    ): QueryBuilderBase<OrderProduct, OrderProductFilterDTO> {
        if (!filter?.orderId) return query;

        const orderIds = !Array.isArray(filter.orderId) ? [filter.orderId] : filter.orderId;

        if (!orderIds.length) return query;

        return query.andWhere('orderProduct.orderId IN (:...orderIds)').setParameters({
            orderIds,
        });
    }
}
