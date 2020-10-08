import { RepositoryBase } from 'src/modules/common/repositories/repository.base';
import { Connection, EntityRepository } from 'typeorm';
import { ProductFilterDTO } from '../dtos/product.filter.dto';
import { Product } from '../entities/product.entity';
import { ProductActiveFilter } from '../filters/product.active.filter';
import { ProductIdFilter } from '../filters/product.id.filter';
import { ProductCompanyFilter } from '../filters/product.company.filter';
import { ProductCategoryFilter } from '../filters/product.category.filter';
import { ProductSearchFilter } from '../filters/product.search.filter';
import { IProductRepository } from '../interface/product.repository.interface';
import { FactoryProvider } from '@nestjs/common';

@EntityRepository(Product)
export class ProductRepository extends RepositoryBase<Product, ProductFilterDTO>
    implements IProductRepository {
    constructor() {
        super();
        this.setFilters([
            new ProductActiveFilter(),
            new ProductIdFilter(),
            new ProductCompanyFilter(),
            new ProductCategoryFilter(),
            new ProductSearchFilter(),
        ]);
    }
}

export const ProductRepositoryProvider: FactoryProvider<ProductRepository> = {
    provide: 'IProductRepository',
    useFactory: (connection: Connection) => connection.getCustomRepository(ProductRepository),
    inject: [Connection],
};
