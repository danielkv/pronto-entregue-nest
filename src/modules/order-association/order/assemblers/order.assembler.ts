import { Assembler, ClassTransformerAssembler } from '@nestjs-query/core';
import { AddressHelper } from 'src/modules/common/helpers/address.helper';
import { OrderInputDTO } from '../dtos/order-input.dto';
import { OrderDTO } from '../dtos/order.dto';
import { Order } from '../entities/order.entity';

// `@Assembler` decorator will register the assembler with `nestjs-query` and
// the QueryService service will be able to auto discover it.
@Assembler(OrderDTO, Order)
export class OrderAssembler extends ClassTransformerAssembler<OrderDTO, Order> {
    constructor(private addressHelper: AddressHelper<Order>) {
        super();
    }

    convertToEntity(dto: OrderDTO): Order {
        const address = dto.address;
        delete dto.address;
        const entity = this.convert(
            Order,
            this.toPlain({
                ...dto,
                ...this.addressHelper.join(address),
            }),
        );

        return entity;
    }

    private convertInputToEntity(dto: OrderInputDTO): Order {
        const address = dto.address;
        delete dto.address;
        const entity = this.convert(Order, {
            ...dto,
            ...this.addressHelper.join(address),
        });

        console.log(entity);
        return entity;
    }

    convertToCreateEntity(inputDto: OrderInputDTO): Order {
        return this.convertInputToEntity(inputDto);
    }

    convertToUpdateEntity(inputDto: OrderInputDTO): Order {
        return this.convertInputToEntity(inputDto);
    }

    convertToDTO(order: Order): OrderDTO {
        const dtoConverted = this.convert(
            OrderDTO,
            this.toPlain({
                ...order,
                address: this.addressHelper.split(order),
            }),
        );

        return dtoConverted;
    }
}
