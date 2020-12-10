import { Field, Float, ID, ObjectType } from '@nestjs/graphql';
import { DeliveryStatusEnum } from '../enums/delivery.status.enum';
import { AddressDTO } from 'src/modules/address/dtos/address.dto';
import { DeliverySizesEnum } from '../enums/delivery-sizes.enum';
import { IsInt, IsNumber, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { FilterableField } from '@nestjs-query/query-graphql';
import { Order } from 'src/modules/order-association/order/entities/order.entity';

@ObjectType('Delivery')
export class DeliveryDTO {
    @IsInt()
    @FilterableField(() => ID)
    id: number;

    @IsInt()
    @FilterableField(() => ID, { nullable: true })
    orderId: Order['id'];

    @FilterableField(() => ID)
    companyId: number;

    @IsString()
    @FilterableField()
    description: string;

    @IsString()
    @Field()
    size: DeliverySizesEnum;

    @IsString()
    @FilterableField(() => DeliveryStatusEnum)
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
    @Type(() => AddressDTO)
    @Field(() => AddressDTO)
    addressFrom: AddressDTO;

    @ValidateNested()
    @Type(() => AddressDTO)
    @Field(() => AddressDTO)
    addressTo: AddressDTO;
}
