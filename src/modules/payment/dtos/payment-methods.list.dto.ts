import { Field, ObjectType } from '@nestjs/graphql';
import { IListEntity } from 'src/modules/common/interfaces/IListEntity';
import { PageInfo } from 'src/modules/common/types/page-info';
import { PaymentMethod } from '../entities/payment.method.entity';

@ObjectType()
export class PaymentMethodsList implements IListEntity<PaymentMethod> {
    @Field(() => [PaymentMethod], { nullable: 'items' })
    items?: PaymentMethod[];

    @Field(() => [PaymentMethod])
    countItems?: number;

    @Field(() => [PaymentMethod], { nullable: true })
    pageInfo: PageInfo;
}
