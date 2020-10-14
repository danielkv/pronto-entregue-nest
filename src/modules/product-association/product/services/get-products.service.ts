import { Inject, Injectable } from '@nestjs/common';
import { Product } from '../entities/product.entity';
import { IProductRepository } from '../interface/product.repository.interface';

@Injectable()
export class GetProductsService {
    constructor(@Inject('IProductRepository') private productRepository: IProductRepository) {}

    execute(productId: Product['id']): Promise<Product>;
    execute(productId: Product['id'][]): Promise<Product[]>;
    execute(productId: any): Promise<Product | Product[]> {
        return this.productRepository.get(productId);
    }
}
