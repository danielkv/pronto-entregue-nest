import { Inject, Injectable } from '@nestjs/common';
import { PageInfo } from 'src/modules/common/types/page-info';
import { OrderOptionFilterDTO } from '../dtos/order-option.filter.dto';
import { OrderOptionOptionGroupFilter } from '../filters/order-option.option-group.filter';
import { IOrderOptionRepository } from '../interfaces/order-option.repository';
import { IOrderOptionListOptions } from '../interfaces/order-option-list-options.interface';
import { OrderOption } from '../entities/order.option.entity';

@Injectable()
export class ListOrderOptionsService {
    constructor(
        @Inject('IOrderOptionRepository') private orderOptionRepository: IOrderOptionRepository,
        private orderOptionOptionGroupFilter: OrderOptionOptionGroupFilter,
    ) {}

    execute(filter?: OrderOptionFilterDTO, pagination?: PageInfo): Promise<OrderOption[]> {
        const options: IOrderOptionListOptions = {
            pagination,
            filter,
            filterHelpers: [this.orderOptionOptionGroupFilter],
        };

        return this.orderOptionRepository.getList(options);
    }
}
