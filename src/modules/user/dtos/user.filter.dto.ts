import { Field, ID, InputType } from '@nestjs/graphql';

@InputType('UserFilterInput')
export class UserFilterDTO {
    @Field(() => [ID])
    userId: number | number[];

    @Field(() => ID)
    companyId: number;

    @Field(() => ID)
    categoryId: number;
}
