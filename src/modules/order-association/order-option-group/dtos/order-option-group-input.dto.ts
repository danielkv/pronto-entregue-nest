import { Field, ID, InputType } from '@nestjs/graphql';
import { OrderOptionInputDTO } from '../../order-option/dtos/order-option-input.dto';
import { OrderOptionGroupPriceType } from '../enums/order-option-group-price-type.enum';

@InputType('OrderOptionGroupInput')
export class OrderOptionGroupInputDTO {
    @Field(() => ID, { nullable: true })
    id?: number;

    @Field()
    name: string;

    @Field(() => OrderOptionGroupPriceType)
    priceType: OrderOptionGroupPriceType;

    @Field()
    optionsGroupRelatedId: number;

    @Field(() => [OrderOptionInputDTO])
    options: OrderOptionInputDTO[];
}
