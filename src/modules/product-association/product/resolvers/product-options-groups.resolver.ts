import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { OptionGroup } from '../../option-group/entities/option.group.entity';
import { Product } from '../entities/product.entity';
import { ProductOptionsGroupsLoader } from '../loaders/product-options-groups.loader';

@Resolver(() => Product)
export class ProductOptionsGroupsResolver {
    constructor(private productOptionsGroupsLoader: ProductOptionsGroupsLoader) {}

    @ResolveField(() => [OptionGroup], { nullable: 'items' })
    optionsGroups(@Parent() orderProduct: Product): Promise<OptionGroup[]> {
        const orderProductId = orderProduct.id;

        return this.productOptionsGroupsLoader.loader.load(orderProductId);
    }
}
