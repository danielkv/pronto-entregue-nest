import { Field, ID, InputType } from '@nestjs/graphql';

@InputType('OrderOptionFilterInput')
export class OrderOptionFilterDTO {
    @Field(() => [ID], { nullable: true })
    orderOptionGroupId?: number | number[];
}
