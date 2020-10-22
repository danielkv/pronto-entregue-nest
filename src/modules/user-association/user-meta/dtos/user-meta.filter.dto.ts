import { Field, ID, InputType } from '@nestjs/graphql';

@InputType('UserMetaFilterInput')
export class UserMetaFilterDTO {
    @Field(() => [ID], { nullable: true })
    userId?: number | number[];
}
