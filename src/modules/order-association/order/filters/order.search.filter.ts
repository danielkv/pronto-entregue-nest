import { Injectable } from '@nestjs/common';
import { IFilter } from '../../../common/interfaces/IFilter';
import { Brackets } from 'typeorm';
import { QueryBuilderBase } from '../../../common/repositories/query.builder.base';
import { Order } from '../entities/order.entity';
import { OrderFilterDTO } from '../dtos/order.filter.dto';

@Injectable()
export class OrderSearchFilter implements IFilter<Order, OrderFilterDTO> {
    apply(query: QueryBuilderBase<Order, OrderFilterDTO>, filter?: any): QueryBuilderBase<Order, OrderFilterDTO> {
        if (!filter?.search) return query;

        return query.andWhere(new Brackets(qb => qb.where('order.message LIKE :search'))).setParameters({
            search: `%${filter.search}%`,
        });
    }
}
