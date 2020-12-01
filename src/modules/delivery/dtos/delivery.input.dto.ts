import { Field, Float, ID, InputType, Int, ObjectType } from '@nestjs/graphql';
import { DeliveryStatusEnum } from '../enums/delivery.status.enum';
import { AddressDTO } from 'src/modules/address/dtos/address.dto';
import { DeliverySizesEnum } from '../enums/delivery-sizes.enum';
import { IsInt, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { FilterableField } from '@nestjs-query/query-graphql';
import { AddressInputDTO } from 'src/modules/address/dtos/address.input.dto';

@InputType('DeliveryInput')
export class DeliveryInputDTO {
    @IsInt()
    @FilterableField(() => ID)
    id?: number;

    @IsString()
    @FilterableField()
    description: string;

    @IsString()
    @Field()
    size: DeliverySizesEnum;

    @IsString()
    @FilterableField()
    status: DeliveryStatusEnum;

    @IsNumber()
    @Field(() => Float)
    value: number;

    @IsString()
    @FilterableField()
    receiverName: string;

    @IsString()
    @FilterableField()
    receiverContact: string;

    @IsString()
    @FilterableField()
    senderContact: string;

    @ValidateNested()
    @Type(() => AddressInputDTO)
    @Field(() => AddressInputDTO)
    addressFrom: AddressInputDTO;

    @ValidateNested()
    @Type(() => AddressInputDTO)
    @Field(() => AddressInputDTO)
    addressTo: AddressInputDTO;

    /* @IsOptional()
    @IsInt()
    @Field(() => Int, { nullable: true })
    orderId?: number; */

    /* @IsOptional()
    @IsInt()
    @Field(() => Int, { nullable: true })
    deliveryManId: number; */
}
