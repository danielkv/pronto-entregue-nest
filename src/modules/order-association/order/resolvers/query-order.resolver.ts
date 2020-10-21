import { UnauthorizedException, UseGuards } from '@nestjs/common';
import { Args, ID, Info, Query, Resolver } from '@nestjs/graphql';
import { AclRoles } from 'src/modules/auth/decorators/checked-roles.decorator';
import { AclScopes } from '../../../auth/decorators/acl-scopes.decorator';
import { UseRoles } from '../../../auth/decorators/use-roles.decorator';
import { ACLResourcesEnum } from '../../../auth/enums/resources.enum';
import { ACGuard } from '../../../auth/guards/ac.guard';
import { IPermissionsScopes, IRole } from '../../../auth/interfaces/guard-roles.interface';
import { AcCheckService } from '../../../auth/services/validate-roles.service';
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
        private acCheckService: AcCheckService,
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

    @UseGuards(ACGuard)
    @UseRoles({
        action: 'read',
        resource: ACLResourcesEnum.ORDER,
        possession: 'own',
        testOwner({ user }, resource: Order) {
            return user.userId === resource.userId;
        },
    })
    @Query(() => Order)
    async order(
        @Args('orderId', { type: () => ID }) orderId: number,
        @AclScopes() permissionScopes: IPermissionsScopes,
        @AclRoles() checkedRoles: IRole[],
    ): Promise<Order> {
        // get order
        const order = await this.getOrderService.execute(orderId);

        // validate read:own
        if (!this.acCheckService.checkOwnerPermission(checkedRoles, permissionScopes, order))
            throw new UnauthorizedException();

        // return order
        return order;
    }
}
