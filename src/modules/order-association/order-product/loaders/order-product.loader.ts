import { Injectable } from '@nestjs/common';
import * as DataLoader from 'dataloader';
import { DataLoaderBase } from '../../../common/helpers/data.loader.base';
import { IDataLoaderBase } from '../../../common/helpers/data.loader.interface';
import { OrderProduct } from '../../order/interfaces/order.product.entity';
import { ListOrderProductsService } from '../services/list-order-products.service';

@Injectable()
export class OrderProductLoader extends DataLoaderBase<number, OrderProduct[]>
    implements IDataLoaderBase<number, OrderProduct[]> {
    constructor(private readonly listOrderProductsService: ListOrderProductsService) {
        super();
    }

    create() {
        return new DataLoader<number, OrderProduct[]>(async keys => {
            const allOrderProducts = await this.listOrderProductsService.execute({ orderId: [...keys] });

            return keys.map(key => {
                return allOrderProducts.filter(orderProduct => orderProduct.orderId === key);
            });
        });
    }
}
