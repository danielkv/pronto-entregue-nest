import { Assembler, ClassTransformerAssembler } from '@nestjs-query/core';
import { AddressHelper } from 'src/modules/common/helpers/address.helper';
import { OrderDTO } from '../dtos/order.dto';
import { Order } from '../entities/order.entity';

// `@Assembler` decorator will register the assembler with `nestjs-query` and
// the QueryService service will be able to auto discover it.
@Assembler(OrderDTO, Order)
export class OrderAssembler extends ClassTransformerAssembler<OrderDTO, Order> {
    /* constructor(private addressHelper: AddressHelper<Order>) {
        super();
    }

    convertToEntity(dto: OrderDTO): Order {
        const entity = this.convert(
            Order,
            this.toPlain({
                ...dto,
                ...this.addressHelper.join(dto.address, 'Address'),
            }),
        );

        return entity;
    }

    convertToDTO(delivery: Order): OrderDTO {
        const dtoConverted = this.convert(
            OrderDTO,
            this.toPlain({
                ...delivery,
                address: this.addressHelper.split(delivery, 'Address'),
            }),
        );

        return dtoConverted;
    } */
}
