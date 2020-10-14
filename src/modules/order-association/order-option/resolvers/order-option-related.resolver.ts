import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { OptionGroup } from 'src/modules/product-association/option-group/entities/option.group.entity';
import { Option } from 'src/modules/product-association/option/entities/option.entity';
import { OrderOption } from '../entities/order.option.entity';
import { OrderOptionRelatedLoader } from '../loaders/order-option-related.loader';

@Resolver(() => OrderOption)
export class OrderOptionRelatedResolver {
    constructor(private orderOptionRelatedLoader: OrderOptionRelatedLoader) {}

    @ResolveField(() => OptionGroup, { nullable: true })
    optionRelated(@Parent() orderOptionGroup: OrderOption) {
        const optionId: Option['id'] = orderOptionGroup.optionRelatedId;

        return this.orderOptionRelatedLoader.loader.load(optionId);
    }
}
