import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { AbstractAddress } from '../../../common/dtos/abstract-address.dto';
import { AddressHelper } from '../../../common/helpers/address.helper';

import { Order } from '../entities/order.entity';
import { OrderTypeEnum } from '../enums/order.type.enum';

@Resolver(() => Order)
export class OrderResolver {
    constructor(private addressHelper: AddressHelper<Order>) {}

    @ResolveField(() => AbstractAddress, { nullable: true })
    address(@Parent() order: Order): AbstractAddress {
        if (order.type === OrderTypeEnum.PICK_UP) return null;

        return this.addressHelper.split(order);
    }
}
