import { Field, Float, InputType, Int } from '@nestjs/graphql';
import { DeliveryStatusEnum } from '../enums/delivery.status.enum';
import { AddressDTO } from 'src/modules/address/dtos/address.dto';
import { DeliverySizesEnum } from '../enums/delivery-sizes.enum';
import { IsInt, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

@InputType('DeliveryInput')
export class DeliveryDTO {
    @IsOptional()
    @IsInt()
    @Field(() => Int)
    id?: number;

    @IsString()
    @Field()
    description: string;

    @IsString()
    @Field()
    size: DeliverySizesEnum;

    @IsString()
    @Field()
    status: DeliveryStatusEnum;

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
    @Type(() => AddressDTO)
    @Field(() => AddressDTO)
    addressFrom: AddressDTO;

    @ValidateNested()
    @Type(() => AddressDTO)
    @Field(() => AddressDTO)
    addressTo: AddressDTO;

    @IsOptional()
    @IsInt()
    @Field(() => Int, { nullable: true })
    orderId?: number;

    @IsOptional()
    @IsInt()
    @Field(() => Int, { nullable: true })
    deliveryManId: number;
}
