import { Args, ID, Info, Query, Resolver } from '@nestjs/graphql';
import { ExtractFieldsPipe } from '../../../common/pipes/extract-fields.pipe';
import { PageInfo } from '../../../common/types/page-info';
import { OrderFilterDTO } from '../dtos/order.filter.dto';
import { OrdersListDTO } from '../dtos/orders.list.dto';
import { Order } from '../entities/order.entity';
import { CountOrdersService } from '../services/count-orders.service';
import { GetOrderService } from '../services/get-order.service';
import { ListOrdersService } from '../services/list-orders.service';

@Resolver()
export class QueryOrderResolver {
    constructor(
        private countOrdersService: CountOrdersService,
        private listOrdersService: ListOrdersService,
        private getOrderService: GetOrderService,
    ) {}

    @Query(() => OrdersListDTO)
    async listOrders(
        @Info(ExtractFieldsPipe) fields: string[],
        @Args('filter', { nullable: true })
        filter?: OrderFilterDTO,
        @Args('pagination', { nullable: true })
        pagination?: PageInfo,
    ): Promise<OrdersListDTO> {
        const list: OrdersListDTO = { pageInfo: pagination };

        if (fields.includes('items')) list.items = await this.listOrdersService.execute(filter, pagination);

        if (fields.includes('countItems')) list.countItems = await this.countOrdersService.execute(filter);

        return list;
    }

    @Query(() => Order)
    order(@Args('orderId', { type: () => ID }) orderId: number): Promise<Order> {
        return this.getOrderService.execute(orderId);
    }
}
