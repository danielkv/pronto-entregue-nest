import { Injectable } from '@nestjs/common';
import { IDataLoaderCreate } from '../../../common/interfaces/data-loader-create.interface';
import { DataLoaderBase } from '../../../common/helpers/data.loader.base';
import { OrderOptionGroup } from '../../order-option-group/entities/order.option.group.entity';
import { ListOrderOptionsGroupsService } from '../../order-option-group/services/list-order-options-groups.service';
import { IDataLoaderBase } from 'src/modules/common/interfaces/data.loader.interface';

@Injectable()
export class OrderProductOptionsGroupsLoader extends DataLoaderBase<number, OrderOptionGroup[]>
    implements IDataLoaderBase<number, OrderOptionGroup[]> {
    constructor(private readonly listOrderOptionsGroupsService: ListOrderOptionsGroupsService) {
        super();
    }

    create(): IDataLoaderCreate<number, OrderOptionGroup[]> {
        return {
            batchLoadFn: async keys => {
                const allGroups = await this.listOrderOptionsGroupsService.execute({ orderProductId: [...keys] });

                return keys.map(key => allGroups.filter(group => group.orderProductId === key));
            },
        };
    }
}
