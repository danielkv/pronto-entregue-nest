import { Field, ID, InputType } from '@nestjs/graphql';

@InputType('CreditHistoryFilterInput')
export class CreditHistoryFilterDTO {
    @Field(() => [ID], { nullable: true })
    userId?: number | number[];
}
