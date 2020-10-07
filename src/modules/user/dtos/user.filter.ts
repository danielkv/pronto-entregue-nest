import { Field, ID, InputType } from '@nestjs/graphql';

@InputType('UserFilterInput')
export class UserFilter {
    @Field(() => [ID])
    userId: number | number[];
}
