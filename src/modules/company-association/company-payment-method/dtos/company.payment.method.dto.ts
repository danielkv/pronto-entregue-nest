import { Field, ID, ObjectType } from '@nestjs/graphql';
import { FilterableField, Relation } from '@nestjs-query/query-graphql';
import { PaymentMethodDTO } from 'src/modules/payment/dtos/payment.method.dto';

@ObjectType('CompanyPaymentMethod')
@Relation('method', () => PaymentMethodDTO, { disableRemove: true, relationName: 'paymentMethod' })
export class CompanyPaymentMethodDTO {
    @FilterableField(() => ID)
    id: number;

    @Field({ nullable: true })
    settings: string | null;

    /* companyId: number | null;

    paymentMethodId: number | null; */
}
