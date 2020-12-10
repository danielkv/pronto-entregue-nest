import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Resolver } from '@nestjs/graphql';
import { AuthContext } from 'src/modules/auth/decorators/auth-context.decorator';
import { UseRoles } from 'src/modules/auth/decorators/use-roles.decorator';
import { ACLResourcesEnum } from 'src/modules/auth/enums/resources.enum';
import { ACGuard } from 'src/modules/auth/guards/ac.guard';
import { IAuthContext } from 'src/modules/auth/interfaces/guard-roles.interface';
import { OrderDTO } from '../dtos/order.dto';
import { Order } from '../entities/order.entity';
import { OrderStatusEnum } from '../enums/order.status.enum';
import { ChangeOrderStatusService } from '../services/change-order-status.service';

@UseGuards(ACGuard)
@Resolver(() => OrderDTO)
export class OrderResolver {
    constructor(private changeOrderStatusService: ChangeOrderStatusService) {}

    @UseRoles({
        action: 'update',
        resource: ACLResourcesEnum.ORDER,
        possession: 'own',
    })
    @Mutation(() => OrderDTO)
    changeOrderStatus(
        @Args('orderId', { type: () => Int }) orderId: Order['id'],
        @Args('newStatus', { type: () => OrderStatusEnum }) newStatus: OrderStatusEnum,
        @AuthContext() authContext: IAuthContext,
    ): Promise<OrderDTO> {
        return this.changeOrderStatusService.execute(orderId, newStatus, authContext);
    }
}
