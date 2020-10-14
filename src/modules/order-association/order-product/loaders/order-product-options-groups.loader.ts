import { Injectable } from '@nestjs/common';
import * as DataLoader from 'dataloader';
import { DataLoaderBase } from '../../../common/helpers/data.loader.base';
import { IDataLoaderBase } from '../../../common/helpers/data.loader.interface';
import { OrderOptionGroup } from '../../order-option-group/entities/order.option.group.entity';
import { ListOrderOptionsGroupsService } from '../../order-option-group/services/list-order-options-groups.service';

@Injectable()
export class OrderProductOptionsGroupsLoader extends DataLoaderBase<number, OrderOptionGroup[]>
    implements IDataLoaderBase<number, OrderOptionGroup[]> {
    constructor(private readonly listOrderOptionsGroupsService: ListOrderOptionsGroupsService) {
        super();
    }

    create() {
        return new DataLoader<number, OrderOptionGroup[]>(async keys => {
            const allGroups = await this.listOrderOptionsGroupsService.execute({ orderProductId: [...keys] });

            return keys.map(key => allGroups.filter(group => group.orderProductId === key));
        });
    }
}
