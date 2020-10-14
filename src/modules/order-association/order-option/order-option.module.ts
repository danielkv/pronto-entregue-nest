import { Module } from '@nestjs/common';
import { OptionModule } from 'src/modules/product-association/option/option.module';
import { OrderOptionOptionGroupFilter } from './filters/order-option.option-group.filter';
import { OrderOptionRelatedLoader } from './loaders/order-option-related.loader';
import { OrderOptionRepositoryProvider } from './repositories/order-option.repository';
import { OrderOptionRelatedResolver } from './resolvers/order-option-related.resolver';
import { ListOrderOptionsService } from './services/list-order-options.service';

@Module({
    imports: [OptionModule],
    providers: [
        // resolvers
        OrderOptionRelatedResolver,

        // loaders
        OrderOptionRelatedLoader,

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
