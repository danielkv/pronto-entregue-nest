import { Field, Float, InputType, Int } from '@nestjs/graphql';
import { OrderStatusEnum } from '../enums/order.status.enum';
import { OrderTypeEnum } from '../enums/order.type.enum';
import { Type } from 'class-transformer';
import { IsDate, IsInt, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { AddressDTO } from 'src/modules/address/dtos/address.dto';

@InputType('OrderInput')
export class OrderDTO {
    @IsOptional()
    @IsInt()
    @Field(() => Int)
    id?: number;

    @IsNumber()
    @Field(() => Float)
    paymentFee: number;

    @IsNumber()
    @Field(() => Float)
    deliveryPrice: number;

    @IsInt()
    @Field(() => Int)
    deliveryTime: number;

    @IsString()
    @Field(() => OrderTypeEnum)
    type: OrderTypeEnum;

    @IsNumber()
    @Field(() => Float)
    price: number;

    @IsNumber()
    @Field(() => Float)
    discount: number;

    @IsString()
    @Field(() => OrderStatusEnum)
    status: OrderStatusEnum;

    @IsString()
    @Field({ nullable: true })
    message: string;

    @ValidateNested()
    @Type(() => AddressDTO)
    @Field(() => AddressDTO)
    address: AddressDTO;

    @IsInt()
    @Field()
    userId: number;

    @IsInt()
    @Field()
    companyId: number;

    @IsInt()
    @Field()
    paymentMethodId: number;

    @IsOptional()
    @IsInt()
    @Field({ nullable: true })
    creditHistoryId?: number;

    @IsOptional()
    @IsInt()
    @Field({ nullable: true })
    couponId?: number;

    @IsOptional()
    @IsDate()
    @Field({ nullable: true })
    scheduledTo?: Date;
}
