import { IRepositoryBase } from '../../../common/interfaces/repository.base.interface';
import { ProductFilterDTO } from '../dtos/product.filter.dto';
import { Product } from '../entities/product.entity';

export interface IProductRepository extends IRepositoryBase<Product, ProductFilterDTO> {}
