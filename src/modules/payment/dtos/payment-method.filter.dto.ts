import { Field, InputType } from '@nestjs/graphql';
import { PaymentMethodTypeEnum } from '../enums/payment-method-type.enum';

@InputType('PaymentMethodFilterInput')
export class PaymentMethodFilterDTO {
    @Field(() => [PaymentMethodTypeEnum], { nullable: true })
    type?: PaymentMethodTypeEnum[];
}
