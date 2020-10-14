import { Module } from '@nestjs/common';
import { OptionGroupModule } from '../../product-association/option-group/option-group.module';
import { OrderOptionModule } from '../order-option/order-option.module';
import { OrderOptionGroupFilterDTO } from './dtos/order-option-group.filter.dto';
import { OrderOptionGroupProductFilter } from './filters/order-option-group.product.filter';
import { OrderOptionGroupRelatedLoader } from './loaders/order-option-group-related.loader';
import { OrderOptionsGroupsOptionsLoader } from './loaders/order-options-groups-options.loader';
import { OrderOptionGroupRepositoryProvider } from './repository/order-option-group.repository';
import { OrderOptionGroupOptionsResolver } from './resolvers/order-option-group-options.resolver';
import { OrderOptionGroupRelatedResolver } from './resolvers/order-option-group-related.resolver';
import { ListOrderOptionsGroupsService } from './services/list-order-options-groups.service';

@Module({
    imports: [OrderOptionGroupFilterDTO, OptionGroupModule, OrderOptionModule],
    providers: [
        // resolvers
        OrderOptionGroupRelatedResolver,
        OrderOptionGroupOptionsResolver,

        // loaders
        OrderOptionGroupRelatedLoader,
        OrderOptionsGroupsOptionsLoader,

        // services
        ListOrderOptionsGroupsService,

        // filters
        OrderOptionGroupProductFilter,

        // repositories
        OrderOptionGroupRepositoryProvider,
    ],
    exports: [ListOrderOptionsGroupsService],
})
export class OrderOptionGroupModule {}
