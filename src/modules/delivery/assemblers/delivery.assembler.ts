import { Assembler, ClassTransformerAssembler } from '@nestjs-query/core';
import { AddressHelper } from 'src/modules/common/helpers/address.helper';
import { DeliveryDTO } from '../dtos/delivery.dto';
import { DeliveryInputDTO } from '../dtos/delivery.input.dto';
import { Delivery } from '../entities/delivery.entity';

// `@Assembler` decorator will register the assembler with `nestjs-query` and
// the QueryService service will be able to auto discover it.
@Assembler(DeliveryDTO, Delivery)
export class DeliveryAssembler extends ClassTransformerAssembler<DeliveryDTO, Delivery> {
    constructor(private addressHelper: AddressHelper<Delivery>) {
        super(DeliveryDTO, Delivery);
    }

    convertToEntity(dto: DeliveryDTO): Delivery {
        const entity = this.convert(
            Delivery,
            this.toPlain({
                ...dto,
                ...this.addressHelper.join(dto.addressFrom, 'From'),
                ...this.addressHelper.join(dto.addressTo, 'To'),
            }),
        );

        return entity;
    }

    private convertInputToEntity(dto: DeliveryInputDTO): Delivery {
        const addressFrom = dto.addressFrom;
        const addressTo = dto.addressTo;
        delete dto.addressFrom;
        delete dto.addressTo;

        let converting = { ...dto };

        if (addressTo) converting = { ...converting, ...this.addressHelper.join(addressTo, 'To') };
        if (addressFrom) converting = { ...converting, ...this.addressHelper.join(addressFrom, 'From') };

        const entity = this.convert(Delivery, converting);

        return entity;
    }

    convertToCreateEntity(inputDto: DeliveryInputDTO): Delivery {
        return this.convertInputToEntity(inputDto);
    }

    convertToUpdateEntity(inputDto: DeliveryInputDTO): Delivery {
        return this.convertInputToEntity(inputDto);
    }

    convertToDTO(delivery: Delivery): DeliveryDTO {
        const dtoConverted = this.convert(
            DeliveryDTO,
            this.toPlain({
                ...delivery,
                addressFrom: this.addressHelper.split(delivery, 'From'),
                addressTo: this.addressHelper.split(delivery, 'To'),
            }),
        );

        return dtoConverted;
    }
}
