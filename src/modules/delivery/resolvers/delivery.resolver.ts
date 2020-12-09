import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Resolver } from '@nestjs/graphql';
import { AuthContext } from 'src/modules/auth/decorators/auth-context.decorator';
import { ACGuard } from 'src/modules/auth/guards/ac.guard';
import { IAuthContext } from 'src/modules/auth/interfaces/guard-roles.interface';
import { User } from 'src/modules/user-association/user/entities/user.entity';

import { DeliveryDTO } from '../dtos/delivery.dto';
import { Delivery } from '../entities/delivery.entity';
import { DeliveryStatusEnum } from '../enums/delivery.status.enum';
import { ChangeDeliveryStatusService } from '../services/change-delivery-status.service';
import { SetDeliveryManService } from '../services/set-delivery-man.service';

@UseGuards(ACGuard)
@Resolver(() => DeliveryDTO)
export class DeliveryResolver {
    constructor(
        private setDeliveryManService: SetDeliveryManService,
        private changeDeliveryStatusService: ChangeDeliveryStatusService,
    ) {}

    @Mutation(() => DeliveryDTO)
    setDeliveryMan(
        @Args('deliveryId', { type: () => Int }) deliveryId: Delivery['id'],
        @Args('userId', { type: () => Int }) userId: User['id'],
    ): Promise<DeliveryDTO> {
        return this.setDeliveryManService.execute(deliveryId, userId);
    }

    @Mutation(() => DeliveryDTO)
    changeDeliveryStatus(
        @Args('deliveryId', { type: () => Int }) deliveryId: Delivery['id'],
        @Args('newStatus', { type: () => DeliveryStatusEnum }) newStatus: DeliveryStatusEnum,
        @AuthContext() authContext: IAuthContext,
    ): Promise<DeliveryDTO> {
        return this.changeDeliveryStatusService.execute(deliveryId, newStatus, authContext);
    }
}
