import { QueryService, InjectAssemblerQueryService } from '@nestjs-query/core';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from 'src/modules/user-association/user/entities/user.entity';
import { DeliveryAssembler } from '../assemblers/delivery.assembler';
import { DeliveryDTO } from '../dtos/delivery.dto';
import { Delivery } from '../entities/delivery.entity';
import { SetDeliveryManService } from '../services/set-delivery-man.service';

@Resolver(() => DeliveryDTO)
export class SetDeliveryManResolver {
    constructor(
        private setDeliveryManService: SetDeliveryManService,
        @InjectAssemblerQueryService(DeliveryAssembler) readonly assembler: QueryService<DeliveryDTO>,
    ) {}

    // Set the return type to the TodoItemConnection
    @Mutation(() => DeliveryDTO)
    setDeliveryMan(
        @Args('deliveryId', { type: () => Int }) deliveryId: Delivery['id'],
        @Args('userId', { type: () => Int }) userId: User['id'],
    ): Promise<DeliveryDTO> {
        return this.setDeliveryManService.execute(deliveryId, userId);
    }
}
