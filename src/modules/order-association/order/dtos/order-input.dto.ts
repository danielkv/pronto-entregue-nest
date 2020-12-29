import { Field, Float, ID, InputType, Int } from '@nestjs/graphql';
import { OrderType, OrderTypeEnum } from '../enums/order.type.enum';
import { IsInt, IsNumber, IsString } from 'class-validator';
import { AddressInputDTO } from 'src/modules/address/dtos/address.input.dto';
import { OrderProductInputDTO } from '../../order-product/dtos/order-product-input.dto';
import { CreditHistoryInputDTO } from 'src/modules/credit-association/credit-history/dtos/credit-history-input.dto';
import { OrderModeEnum } from '../enums/order-mode-enum';

@InputType('OrderInput')
export class OrderInputDTO {
    @IsNumber()
    @Field(() => Float, { nullable: true })
    paymentFee: number;

    @IsNumber()
    @Field(() => Float)
    deliveryPrice: number;

    @IsInt()
    @Field(() => Int)
    deliveryTime: number;

    @IsString()
    @Field(() => OrderTypeEnum)
    type: OrderType;

    @IsNumber()
    @Field(() => Float)
    price: number;

    @IsNumber()
    @Field(() => Float)
    discount: number;

    @IsString()
    @Field({ nullable: true })
    message: string;

    @Field(() => AddressInputDTO)
    address: AddressInputDTO;

    @Field(() => ID)
    userId: number;

    @Field(() => ID)
    companyId: number;

    @Field(() => ID, { nullable: true })
    couponId: number;

    @Field({ nullable: true })
    scheduledTo: Date;

    @Field(() => [OrderProductInputDTO])
    products: OrderProductInputDTO[];

    // usado para criar um novo histórico
    @Field({ nullable: true, defaultValue: false })
    useCredit: boolean;
    creditHistory: CreditHistoryInputDTO;

    // pode ser definido apenas pelo backend
    mode: OrderModeEnum;
}
