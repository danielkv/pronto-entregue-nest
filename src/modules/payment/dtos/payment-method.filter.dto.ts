import { Field, ID, InputType } from '@nestjs/graphql';
import { PaymentMethodTypeEnum } from '../enums/payment-method-type.enum';

@InputType('PaymentMethodFilterInput')
export class PaymentMethodFilterDTO {
    @Field(() => [ID], { nullable: true })
    companyId?: number | number[];

    @Field(() => [PaymentMethodTypeEnum], { nullable: true })
    type?: PaymentMethodTypeEnum[];
}
