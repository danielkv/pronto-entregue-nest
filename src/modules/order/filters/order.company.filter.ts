import { Injectable } from '@nestjs/common';
import { IFilter } from '../../common/interfaces/IFilter';
import { QueryBuilderBase } from '../../common/repositories/query.builder.base';
import { Order } from '../entities/order.entity';
import { OrderFilterDTO } from '../dtos/order.filter.dto';

@Injectable()
export class OrderCompanyFilter implements IFilter<Order, OrderFilterDTO> {
    apply(
        query: QueryBuilderBase<Order, OrderFilterDTO>,
        filter?: OrderFilterDTO,
    ): QueryBuilderBase<Order, OrderFilterDTO> {
        if (!filter?.companyId) return query;

        const companyIds = !Array.isArray(filter.companyId) ? [filter.companyId] : filter.companyId;

        return query.andWhere('order.companyIds IN (:...companyIds)').setParameters({
            companyIds,
        });
    }
}
