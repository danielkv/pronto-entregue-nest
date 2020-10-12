import { Inject, Injectable } from '@nestjs/common';
import { PageInfo } from 'src/modules/common/types/page-info';
import { OrderProduct } from '../../order/interfaces/order.product.entity';
import { OrderProductFilterDTO } from '../dtos/order-product.filter.dto';
import { OrderProductOrderFilter } from '../filters/order-product.order.filter';
import { IOrderProductRepository } from '../interfaces/order-product.repository.interface';

@Injectable()
export class ListOrderProductsService {
    constructor(
        @Inject('IOrderProductRepository') private orderProductRepository: IOrderProductRepository,
        private orderProductOrderFilter: OrderProductOrderFilter,
    ) {}

    execute(filter?: OrderProductFilterDTO, pagination?: PageInfo): Promise<OrderProduct[]> {
        this.orderProductRepository.setFilters([this.orderProductOrderFilter]);

        return this.orderProductRepository.getList({ filter, pagination });
    }
}
