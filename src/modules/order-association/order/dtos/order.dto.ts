import { Field, Float, ID, Int, ObjectType } from '@nestjs/graphql';
import { OrderStatusEnum } from '../enums/order.status.enum';
import { OrderType, OrderTypeEnum } from '../enums/order.type.enum';
import { IsInt, IsNumber, IsString } from 'class-validator';
import { FilterableField, FilterableRelation, Relation } from '@nestjs-query/query-graphql';
import { PaymentMethodDTO } from 'src/modules/payment/dtos/payment.method.dto';
import { AddressDTO } from 'src/modules/address/dtos/address.dto';
import { OrderProductDTO } from '../../order-product/dtos/order.product.dto';
import { OrderModeEnum } from '../enums/order-mode-enum';

@ObjectType('Order')
@Relation('paymentMethod', () => PaymentMethodDTO)
@Relation('products', () => [OrderProductDTO])
export class OrderDTO {
    @FilterableField(() => ID, { nullable: true })
    id?: number;

    @IsNumber()
    @Field(() => Float, { nullable: true })
    paymentFee: number;

    @IsNumber()
    @FilterableField(() => Float)
    deliveryPrice: number;

    @IsInt()
    @FilterableField(() => Int)
    deliveryTime: number;

    @IsString()
    @FilterableField(() => OrderTypeEnum)
    type: OrderType;

    @IsNumber()
    @FilterableField(() => Float)
    price: number;

    @IsNumber()
    @FilterableField(() => Float)
    discount: number;

    @IsString()
    @FilterableField(() => OrderStatusEnum)
    status: OrderStatusEnum;

    @IsString()
    @FilterableField({ nullable: true })
    message: string;

    @FilterableField()
    createdAt: Date;

    @Field(() => AddressDTO)
    address: AddressDTO;

    @FilterableField(() => ID)
    userId: number;

    @FilterableField(() => ID)
    companyId: number;

    @FilterableField(() => ID, { nullable: true })
    creditHistoryId: number;

    @FilterableField(() => ID, { nullable: true })
    couponId: number;

    @FilterableField({ nullable: true })
    scheduledTo: Date;

    @FilterableField(() => OrderModeEnum, { nullable: false })
    mode: OrderModeEnum;
}
