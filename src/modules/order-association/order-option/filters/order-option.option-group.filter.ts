import { Injectable } from '@nestjs/common';
import { IFilter } from '../../../common/interfaces/IFilter';
import { QueryBuilderBase } from '../../../common/repositories/query.builder.base';
import { OrderOptionFilterDTO } from '../dtos/order-option.filter.dto';
import { OrderOption } from '../entities/order.option.entity';

@Injectable()
export class OrderOptionOptionGroupFilter implements IFilter<OrderOption, OrderOptionFilterDTO> {
    apply(
        query: QueryBuilderBase<OrderOption, OrderOptionFilterDTO>,
        filter?: OrderOptionFilterDTO,
    ): QueryBuilderBase<OrderOption, OrderOptionFilterDTO> {
        if (!filter?.orderOptionGroupId) return query;

        const orderOptionGroupIds = !Array.isArray(filter.orderOptionGroupId)
            ? [filter.orderOptionGroupId]
            : filter.orderOptionGroupId;

        if (!orderOptionGroupIds.length) return query;

        return query.andWhere('orderOption.orderOptionsGroupId IN (:...orderOptionGroupIds)').setParameters({
            orderOptionGroupIds,
        });
    }
}
