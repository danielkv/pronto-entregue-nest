import { Args, ID, Query, Resolver } from '@nestjs/graphql';
import { Product } from '../entities/product.entity';
import { GetProductsService } from '../services/get-products.service';

@Resolver()
export class QueryProductResolver {
    constructor(private getProductService: GetProductsService) {}

    @Query(() => Product)
    product(@Args('productId', { type: () => ID }) productId: Product['id']): Promise<Product> {
        return this.getProductService.execute(productId);
    }
}
