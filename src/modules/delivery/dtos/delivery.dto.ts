import { Field, Float, ID, Int, ObjectType } from '@nestjs/graphql';
import { DeliveryStatusEnum } from '../enums/delivery.status.enum';
import { AddressDTO } from 'src/modules/address/dtos/address.dto';
import { DeliverySizesEnum } from '../enums/delivery-sizes.enum';
import { IsInt, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { FilterableField } from '@nestjs-query/query-graphql';

@ObjectType('Delivery')
export class DeliveryDTO {
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

    /*  @ValidateNested()
    @Type(() => AddressDTO)
    @Field(() => AddressDTO)
    addressFrom: AddressDTO;

    @ValidateNested()
    @Type(() => AddressDTO)
    @Field(() => AddressDTO)
    addressTo: AddressDTO; */

    /* @IsOptional()
    @IsInt()
    @Field(() => Int, { nullable: true })
    orderId?: number; */

    /* @IsOptional()
    @IsInt()
    @Field(() => Int, { nullable: true })
    deliveryManId: number; */
}
