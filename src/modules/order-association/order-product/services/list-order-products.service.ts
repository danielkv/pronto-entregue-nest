import { Inject, Injectable } from '@nestjs/common';
import { IRepositoryListOptions } from 'src/modules/common/interfaces/IRepositoryListOptions';
import { PageInfo } from 'src/modules/common/types/page-info';
import { OrderProduct } from '../entities/order.product.entity';
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
        const options: IRepositoryListOptions<OrderProduct, OrderProductFilterDTO> = {
            pagination,
            filter,
            filterHelpers: [this.orderProductOrderFilter],
        };

        return this.orderProductRepository.getList(options);
    }
}
