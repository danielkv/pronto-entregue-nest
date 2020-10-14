import { Injectable } from '@nestjs/common';
import * as DataLoader from 'dataloader';
import { DataLoaderBase } from '../../../common/helpers/data.loader.base';
import { IDataLoaderBase } from '../../../common/helpers/data.loader.interface';
import { OrderOption } from '../../order-option/entities/order.option.entity';
import { ListOrderOptionsService } from '../../order-option/services/list-order-options.service';

@Injectable()
export class OrderOptionsGroupsOptionsLoader extends DataLoaderBase<number, OrderOption[]>
    implements IDataLoaderBase<number, OrderOption[]> {
    constructor(private readonly listOrderOptionsService: ListOrderOptionsService) {
        super();
    }

    create() {
        return new DataLoader<number, OrderOption[]>(async keys => {
            const allOptions = await this.listOrderOptionsService.execute({ orderOptionGroupId: [...keys] });

            return keys.map(key => allOptions.filter(option => option.orderOptionsGroupId === key));
        });
    }
}
