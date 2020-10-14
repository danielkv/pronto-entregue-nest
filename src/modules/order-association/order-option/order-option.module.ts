import { Module } from '@nestjs/common';
import { OrderOptionOptionGroupFilter } from './filters/order-option.option-group.filter';
import { OrderOptionRepositoryProvider } from './repositories/order-option.repository';
import { ListOrderOptionsService } from './services/list-order-options.service';

@Module({
    providers: [
        // services
        ListOrderOptionsService,

        // filters
        OrderOptionOptionGroupFilter,

        // repositories
        OrderOptionRepositoryProvider,
    ],
    exports: [ListOrderOptionsService],
})
export class OrderOptionModule {}
