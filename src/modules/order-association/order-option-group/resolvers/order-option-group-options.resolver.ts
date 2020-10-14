import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { OptionGroup } from 'src/modules/product-association/option-group/entities/option.group.entity';
import { OrderOption } from '../../order-option/entities/order.option.entity';
import { OrderOptionGroup } from '../entities/order.option.group.entity';
import { OrderOptionsGroupsOptionsLoader } from '../loaders/order-options-groups-options.loader';

@Resolver(() => OrderOptionGroup)
export class OrderOptionGroupOptionsResolver {
    constructor(private orderOptionsGroupsOptionsLoader: OrderOptionsGroupsOptionsLoader) {}

    @ResolveField(() => [OrderOption])
    options(@Parent() orderOptionGroup: OrderOptionGroup): Promise<OrderOption[]> {
        const optionGroup: OptionGroup['id'] = orderOptionGroup.optionsGroupRelatedId;

        return this.orderOptionsGroupsOptionsLoader.loader.load(optionGroup);
    }
}
