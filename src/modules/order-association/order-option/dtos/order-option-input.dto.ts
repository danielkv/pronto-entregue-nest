import { Field, Float, ID, InputType } from '@nestjs/graphql';

@InputType('OrderOptionInput')
export class OrderOptionInputDTO {
    @Field(() => ID, { nullable: true })
    id?: number;

    @Field()
    name: string;

    @Field()
    description: string;

    @Field(() => Float)
    price: number;

    @Field(() => ID)
    optionRelatedId: number;
}
