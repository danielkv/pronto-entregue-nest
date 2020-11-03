import { Product } from '../entities/product.entity';

export interface IUpdateProductEvent {
    product: Product;
}
