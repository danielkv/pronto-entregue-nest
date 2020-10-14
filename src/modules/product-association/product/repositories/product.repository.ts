import { RepositoryBase } from '../../../common/repositories/repository.base';
import { EntityRepository } from 'typeorm';
import { ProductFilterDTO } from '../dtos/product.filter.dto';
import { Product } from '../entities/product.entity';
import { IProductRepository } from '../interface/product.repository.interface';
import { RepositoryProviderFactory } from '../../../common/helpers/repository-provider.factory';

@EntityRepository(Product)
export class ProductRepository extends RepositoryBase<Product, ProductFilterDTO> implements IProductRepository {
    constructor() {
        super();

        this.setQueryBuilderTableName('product');
    }
}

export const ProductRepositoryProvider = new RepositoryProviderFactory(
    'IProductRepository',
    ProductRepository,
).create();
