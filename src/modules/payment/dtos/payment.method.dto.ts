import { FilterableField } from '@nestjs-query/query-graphql';
import { Field, Float, ID, Int, ObjectType } from '@nestjs/graphql';
import { PaymentMethodFeeTypeEnum } from '../enums/payment-method-fee-type.enum';
import { PaymentMethodTypeEnum } from '../enums/payment-method-type.enum';

@ObjectType('PaymentMethod')
export class PaymentMethodDTO {
    @FilterableField(() => ID)
    id: number;

    @FilterableField(() => PaymentMethodTypeEnum)
    type: PaymentMethodTypeEnum;

    @FilterableField()
    displayName: string | null;

    @Field()
    image: string | null;

    @Field(() => Int)
    order: number;

    @FilterableField(() => Float)
    fee: number;

    @FilterableField(() => PaymentMethodFeeTypeEnum)
    feeType: PaymentMethodFeeTypeEnum;

    @FilterableField()
    active: boolean;
}
