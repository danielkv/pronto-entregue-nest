import { IRepositoryListOptions } from 'src/modules/common/interfaces/IRepositoryListOptions';
import { ProductFilterDTO } from '../dtos/product.filter.dto';
import { Product } from '../entities/product.entity';

export interface IProductListOptions extends IRepositoryListOptions<Product, ProductFilterDTO> {}
