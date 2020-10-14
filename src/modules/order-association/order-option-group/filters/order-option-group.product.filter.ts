import { Injectable } from '@nestjs/common';
import { IFilter } from '../../../common/interfaces/IFilter';
import { QueryBuilderBase } from '../../../common/repositories/query.builder.base';
import { OrderOptionGroupFilterDTO } from '../dtos/order-option-group.filter.dto';
import { OrderOptionGroup } from '../entities/order.option.group.entity';

@Injectable()
export class OrderOptionGroupProductFilter implements IFilter<OrderOptionGroup, OrderOptionGroupFilterDTO> {
    apply(
        query: QueryBuilderBase<OrderOptionGroup, OrderOptionGroupFilterDTO>,
        filter?: OrderOptionGroupFilterDTO,
    ): QueryBuilderBase<OrderOptionGroup, OrderOptionGroupFilterDTO> {
        if (!filter?.orderProductId) return query;

        const orderProductIds = !Array.isArray(filter.orderProductId) ? [filter.orderProductId] : filter.orderProductId;

        if (!orderProductIds.length) return query;

        return query.andWhere('orderOptionGroup.orderProductId IN (:...orderProductIds)').setParameters({
            orderProductIds,
        });
    }
}
