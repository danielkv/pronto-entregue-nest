import { IRepositoryBase } from '../../../common/interfaces/repository.base.interface';
import { Product } from '../entities/product.entity';

export interface IProductRepository extends IRepositoryBase<Product> {}
