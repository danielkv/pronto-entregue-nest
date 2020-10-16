import { Injectable } from '@nestjs/common';
import { IDataLoaderCreate } from 'src/modules/common/interfaces/data-loader-create.interface';
import { Product } from 'src/modules/product-association/product/entities/product.entity';
import { GetProductsService } from 'src/modules/product-association/product/services/get-products.service';
import { DataLoaderBase } from '../../../common/helpers/data.loader.base';
import { IDataLoaderBase } from '../../../common/interfaces/data.loader.interface';

@Injectable()
export class OrderProductRelatedLoader extends DataLoaderBase<number, Product>
    implements IDataLoaderBase<number, Product> {
    constructor(private readonly getProductsService: GetProductsService) {
        super();
    }

    create(): IDataLoaderCreate<number, Product> {
        return {
            batchLoadFn: async keys => {
                const allProducts = await this.getProductsService.execute([...keys]);

                return this.remap([...keys], allProducts);
            },
        };
    }
}
