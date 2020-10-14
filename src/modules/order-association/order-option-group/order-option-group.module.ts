import { Module } from '@nestjs/common';
import { OrderOptionGroupFilterDTO } from './dtos/order-option-group.filter.dto';
import { OrderOptionGroupProductFilter } from './filters/order-option-group.product.filter';
import { OrderOptionGroupRepositoryProvider } from './repository/order-option-group.repository';
import { ListOrderOptionsGroupsService } from './services/list-order-options-groups.service';

@Module({
    imports: [OrderOptionGroupFilterDTO],
    providers: [
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
