import { Injectable } from '@nestjs/common';
import * as DataLoader from 'dataloader';
import { DataLoaderBase } from '../../../common/helpers/data.loader.base';
import { IDataLoaderBase } from '../../../common/interfaces/data.loader.interface';
import { OrderProduct } from '../../order-product/entities/order.product.entity';
import { ListOrderProductsService } from '../../order-product/services/list-order-products.service';

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
