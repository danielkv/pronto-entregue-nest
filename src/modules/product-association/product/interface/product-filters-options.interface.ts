import { IRepositoryFiltersOptions } from '../../../common/interfaces/IRepositoryFiltersOptions';
import { ProductFilterDTO } from '../dtos/product.filter.dto';
import { Product } from '../entities/product.entity';

export interface IProductFiltersOptions extends IRepositoryFiltersOptions<Product, ProductFilterDTO> {}
