import { Field, ID, InputType } from '@nestjs/graphql';

@InputType('UserFilterInput')
export class UserFilterDTO {
    @Field(() => [ID], { nullable: true })
    userId?: number | number[];

    @Field(() => [ID], { nullable: true })
    companyId?: number | number[];

    @Field({ nullable: true })
    onlyActive?: boolean;
}
