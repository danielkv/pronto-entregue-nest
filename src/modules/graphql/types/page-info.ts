import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PageInfo {
    @Field(() => Int)
    page: number;

    @Field(() => Int)
    rowsPerPage: number;
}
