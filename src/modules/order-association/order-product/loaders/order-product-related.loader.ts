import { Injectable } from '@nestjs/common';
import * as DataLoader from 'dataloader';
import { Product } from 'src/modules/product/entities/product.entity';
import { GetProductsService } from 'src/modules/product/services/get-products.service';
import { DataLoaderBase } from '../../../common/helpers/data.loader.base';
import { IDataLoaderBase } from '../../../common/helpers/data.loader.interface';

@Injectable()
export class OrderProductRelatedLoader extends DataLoaderBase<number, Product>
    implements IDataLoaderBase<number, Product> {
    constructor(private readonly getProductsService: GetProductsService) {
        super();
    }

    create() {
        return new DataLoader<number, Product>(async keys => {
            const allProducts = await this.getProductsService.execute([...keys]);

            return this.remap([...keys], allProducts);
        });
    }
}
