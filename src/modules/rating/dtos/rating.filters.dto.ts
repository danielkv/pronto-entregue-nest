import { Field, ID, InputType } from '@nestjs/graphql';

@InputType('RatingFilterInput')
export class RatingFilterDTO {
    @Field({ nullable: true })
    search?: string;

    @Field(() => [ID], { nullable: true })
    userId?: number | number[];

    @Field(() => [ID], { nullable: true })
    companyId?: number | number[];

    @Field(() => [ID], { nullable: true })
    orderId?: number | number[];
}
