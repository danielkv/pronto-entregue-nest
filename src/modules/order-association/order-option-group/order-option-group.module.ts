import { Module } from '@nestjs/common';
import { OptionGroupModule } from '../../product-association/option-group/option-group.module';
import { OrderOptionGroupFilterDTO } from './dtos/order-option-group.filter.dto';
import { OrderOptionGroupProductFilter } from './filters/order-option-group.product.filter';
import { OrderOptionGroupRelatedLoader } from './loaders/order-option-group-related.loader';
import { OrderOptionGroupRepositoryProvider } from './repository/order-option-group.repository';
import { OrderOptionGroupRelatedResolver } from './resolvers/order-option-group-related.resolver';
import { ListOrderOptionsGroupsService } from './services/list-order-options-groups.service';

@Module({
    imports: [OrderOptionGroupFilterDTO, OptionGroupModule],
    providers: [
        // resolvers
        OrderOptionGroupRelatedResolver,

        // loaders
        OrderOptionGroupRelatedLoader,

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
