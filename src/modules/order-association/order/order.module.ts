import { Module } from '@nestjs/common';
import { OrderFilterDTO } from './dtos/order.filter.dto';
import { OrdersListDTO } from './dtos/orders.list.dto';
import { ListOrdersService } from './services/list-orders.service';
import { CountOrdersService } from './services/count-orders.service';
import { OrderRepositoryProvider } from './repositories/order.repository';
import { OrderCompanyFilter } from './filters/order.company.filter';
import { OrderSearchFilter } from './filters/order.search.filter';
import { OrderStatusFilter } from './filters/order.status.filter';
import { OrderTypeFilter } from './filters/order.type.filter';
import { OrderUserFilter } from './filters/order.user.filter';
import { QueryOrderResolver } from './resolvers/query-order.resolver';
import { OrderResolver } from './resolvers/order.resolver';
import { GetOrderService } from './services/get-order.service';

@Module({
    imports: [OrderFilterDTO, OrdersListDTO],
    providers: [
        // filters
        OrderCompanyFilter,
        OrderSearchFilter,
        OrderStatusFilter,
        OrderTypeFilter,
        OrderUserFilter,

        // services
        GetOrderService,
        ListOrdersService,
        CountOrdersService,

        // resolvers
        QueryOrderResolver,
        OrderResolver,

        // repositories
        OrderRepositoryProvider,
    ],
})
export class OrderModule {}
