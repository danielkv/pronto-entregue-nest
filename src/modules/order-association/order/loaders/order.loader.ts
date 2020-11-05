import { Injectable } from '@nestjs/common';
import { DataLoaderBase } from 'src/modules/common/helpers/data.loader.base';
import { IDataLoaderCreate } from 'src/modules/common/interfaces/data-loader-create.interface';
import { IDataLoaderBase } from 'src/modules/common/interfaces/data.loader.interface';
import { Order } from '../entities/order.entity';
import { GetOrderService } from '../services/get-order.service';

@Injectable()
export class OrderLoader extends DataLoaderBase<number, Order> implements IDataLoaderBase<number, Order> {
    constructor(private readonly getOrderService: GetOrderService) {
        super();
    }

    create(): IDataLoaderCreate<number, Order> {
        return {
            batchLoadFn: async keys => {
                const users = await this.getOrderService.execute([...keys]);

                return this.remap([...keys], users);
            },
        };
    }
}
