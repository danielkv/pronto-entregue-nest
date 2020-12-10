import { Field, Float, ID, InputType } from '@nestjs/graphql';
import { DeliverySizesEnum } from '../enums/delivery-sizes.enum';
import { IsNumber, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

import { AddressInputDTO } from 'src/modules/address/dtos/address.input.dto';
import { Order } from 'src/modules/order-association/order/entities/order.entity';

@InputType('DeliveryInput')
export class DeliveryInputDTO {
    @IsString()
    @Field()
    description: string;

    @IsString()
    @Field({ nullable: true })
    size?: DeliverySizesEnum;

    @IsNumber()
    @Field(() => Float)
    value: number;

    @IsString()
    @Field()
    receiverName: string;

    @IsString()
    @Field()
    receiverContact: string;

    @IsString()
    @Field()
    senderContact: string;

    @ValidateNested()
    @Type(() => AddressInputDTO)
    @Field(() => AddressInputDTO)
    addressFrom: AddressInputDTO;

    @ValidateNested()
    @Type(() => AddressInputDTO)
    @Field(() => AddressInputDTO)
    addressTo: AddressInputDTO;

    @Field(() => ID)
    companyId: number;

    @Field(() => ID, { nullable: true })
    orderId?: Order['id'];
}
