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
import { OrderProductLoader } from './loaders/order-product.loader';
import { OrderProductModule } from '../order-product/order-product.module';
import { OrderProductResolver } from './resolvers/order-product.resolver';
import { UpdateOrderService } from './services/update-order.service';
import { CreateOrderService } from './services/create-order.service';

@Module({
    imports: [OrderFilterDTO, OrdersListDTO, OrderProductModule],
    providers: [
        // filters
        OrderCompanyFilter,
        OrderSearchFilter,
        OrderStatusFilter,
        OrderTypeFilter,
        OrderUserFilter,

        // loaders
        OrderProductLoader,

        // services
        GetOrderService,
        ListOrdersService,
        CountOrdersService,
        UpdateOrderService,
        CreateOrderService,

        // resolvers
        QueryOrderResolver,
        OrderResolver,
        OrderProductResolver,

        // repositories
        OrderRepositoryProvider,
    ],
})
export class OrderModule {}
