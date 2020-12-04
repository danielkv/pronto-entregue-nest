import { Field, Float, ID, InputType, Int } from '@nestjs/graphql';

@InputType('OptionInput')
export class OptionInputDTO {
    @Field(() => ID, { nullable: true })
    id?: number;

    @Field()
    name: string;

    @Field()
    description: string;

    @Field(() => Int)
    order: number;

    @Field(() => Int)
    maxSelectRestrainOther: number;

    @Field()
    active: boolean;

    @Field()
    removed: boolean;

    @Field(() => Float)
    price: number;
}
