import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';

@InputType('PageInfoInput')
@ObjectType()
export class PageInfo {
    @Field(() => Int, { nullable: true })
    page?: number;

    @Field(() => Int, { nullable: true })
    skip?: number;

    @Field(() => Int)
    take: number;
}
