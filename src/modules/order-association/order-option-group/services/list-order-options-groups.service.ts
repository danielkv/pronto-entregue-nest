import { Inject, Injectable } from '@nestjs/common';
import { IRepositoryListOptions } from 'src/modules/common/interfaces/IRepositoryListOptions';
import { PageInfo } from 'src/modules/common/types/page-info';
import { IOrderProductRepository } from '../../order-product/interfaces/order-product.repository.interface';
import { OrderOptionGroupFilterDTO } from '../dtos/order-option-group.filter.dto';
import { OrderOptionGroup } from '../entities/order.option.group.entity';
import { OrderOptionGroupProductFilter } from '../filters/order-option-group.product.filter';
import { IOrderOptionGroupListOptions } from '../interfaces/order-option-group-list-options.interface';
import { IOrderOptionGroupRepository } from '../interfaces/order-option-group.interface';

@Injectable()
export class ListOrderOptionsGroupsService {
    constructor(
        @Inject('IOrderOptionGroupRepository') private orderOptionGroupRepository: IOrderOptionGroupRepository,
        private orderOptionGroupProductFilter: OrderOptionGroupProductFilter,
    ) {}

    execute(filter?: OrderOptionGroupFilterDTO, pagination?: PageInfo): Promise<OrderOptionGroup[]> {
        const options: IOrderOptionGroupListOptions = {
            pagination,
            filter,
            filterHelpers: [this.orderOptionGroupProductFilter],
        };

        return this.orderOptionGroupRepository.getList(options);
    }
}
