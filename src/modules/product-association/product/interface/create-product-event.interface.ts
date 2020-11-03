import { Product } from '../entities/product.entity';

export interface ICreateProductEvent {
    product: Product;
}
