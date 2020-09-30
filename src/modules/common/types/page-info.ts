import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { IPageInfo } from '../interfaces/IPageInfo';

@InputType('PageInfoInput')
@ObjectType()
export class PageInfo implements IPageInfo {
    @Field(() => Int, { nullable: true })
    page?: number;

    @Field(() => Int, { nullable: true })
    skip?: number;

    @Field(() => Int)
    take: number;
}
