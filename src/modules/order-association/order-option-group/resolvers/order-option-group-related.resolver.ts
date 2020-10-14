import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { OptionGroup } from 'src/modules/product-association/option-group/entities/option.group.entity';
import { OrderOptionGroup } from '../entities/order.option.group.entity';
import { OrderOptionGroupRelatedLoader } from '../loaders/order-option-group-related.loader';

@Resolver(() => OrderOptionGroup)
export class OrderOptionGroupRelatedResolver {
    constructor(private orderOptionGroupRelatedLoader: OrderOptionGroupRelatedLoader) {}

    @ResolveField(() => OptionGroup)
    productRelated(@Parent() orderOptionGroup: OrderOptionGroup) {
        const optionGroup: OptionGroup['id'] = orderOptionGroup.optionsGroupRelatedId;

        return this.orderOptionGroupRelatedLoader.loader.load(optionGroup);
    }
}
