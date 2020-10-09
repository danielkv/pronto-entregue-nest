import { Field, ID, InputType } from '@nestjs/graphql';

@InputType('CreditBalanceFilterInput')
export class CreditBalanceFilterDTO {
    @Field(() => [ID], { nullable: true })
    userId?: number | number[];
}
