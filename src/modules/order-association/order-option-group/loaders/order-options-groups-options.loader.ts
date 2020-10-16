import { Injectable } from '@nestjs/common';
import { IDataLoaderCreate } from '../../../common/interfaces/data-loader-create.interface';
import { IDataLoaderBase } from '../../../common/interfaces/data.loader.interface';
import { DataLoaderBase } from '../../../common/helpers/data.loader.base';
import { OrderOption } from '../../order-option/entities/order.option.entity';
import { ListOrderOptionsService } from '../../order-option/services/list-order-options.service';

@Injectable()
export class OrderOptionsGroupsOptionsLoader extends DataLoaderBase<number, OrderOption[]>
    implements IDataLoaderBase<number, OrderOption[]> {
    constructor(private readonly listOrderOptionsService: ListOrderOptionsService) {
        super();
    }

    create(): IDataLoaderCreate<number, OrderOption[]> {
        return {
            batchLoadFn: async keys => {
                const allOptions = await this.listOrderOptionsService.execute({ orderOptionGroupId: [...keys] });

                return keys.map(key => allOptions.filter(option => option.orderOptionsGroupId === key));
            },
        };
    }
}
