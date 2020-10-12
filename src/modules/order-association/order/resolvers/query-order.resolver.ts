import { Args, Info, Query, Resolver } from '@nestjs/graphql';
import { ExtractFieldsPipe } from 'src/modules/common/pipes/extract-fields.pipe';
import { PageInfo } from 'src/modules/common/types/page-info';
import { OrderFilterDTO } from '../dtos/order.filter.dto';
import { OrdersListDTO } from '../dtos/orders.list.dto';
import { CountOrdersService } from '../services/count-orders.service';
import { ListOrdersService } from '../services/list-orders.service';

@Resolver()
export class QueryOrderResolver {
    constructor(private countOrdersService: CountOrdersService, private listOrdersService: ListOrdersService) {}

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
}
