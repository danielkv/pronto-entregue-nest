import { Inject, Injectable } from '@nestjs/common';
import { PageInfo } from 'src/modules/common/types/page-info';
import { OrderFilterDTO } from '../dtos/order.filter.dto';
import { OrderCompanyFilter } from '../filters/order.company.filter';
import { OrderSearchFilter } from '../filters/order.search.filter';
import { OrderStatusFilter } from '../filters/order.status.filter';
import { OrderTypeFilter } from '../filters/order.type.filter';
import { OrderUserFilter } from '../filters/order.user.filter';
import { IOrderRepository } from '../interfaces/order.repository.interface';

@Injectable()
export class CountOrdersService {
    constructor(
        @Inject('IOrderRepository') private orderRepository: IOrderRepository,
        private orderCompanyFilter: OrderCompanyFilter,
        private orderSearchFilter: OrderSearchFilter,
        private orderStatusFilter: OrderStatusFilter,
        private orderTypeFilter: OrderTypeFilter,
        private orderUserFilter: OrderUserFilter,
    ) {}

    execute(filter?: OrderFilterDTO): Promise<number> {
        this.orderRepository.setFilters([
            this.orderCompanyFilter,
            this.orderSearchFilter,
            this.orderStatusFilter,
            this.orderTypeFilter,
            this.orderUserFilter,
        ]);

        return this.orderRepository.getCount(filter);
    }
}
