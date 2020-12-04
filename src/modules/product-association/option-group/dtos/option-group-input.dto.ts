import { Field, ID, InputType, Int } from '@nestjs/graphql';
import { OptionGroupTypeEnum } from '../enums/option-group-type.enum';
import { OptionGroupPriceTypeEnum } from '../enums/option-group-price-type.enum';
import { OptionInputDTO } from '../../option/dtos/option-input.dto';

@InputType('OptionGroupInput')
export class OptionGroupInputDTO {
    @Field(() => ID, { nullable: true })
    id?: number;

    @Field()
    name: string;

    @Field(() => OptionGroupTypeEnum)
    type: OptionGroupTypeEnum;

    @Field(() => OptionGroupPriceTypeEnum)
    priceType: OptionGroupPriceTypeEnum;

    @Field(() => Int)
    order: number;

    @Field(() => Int)
    minSelect: number;

    @Field(() => Int)
    maxSelect: number;

    @Field()
    active: boolean;

    @Field()
    removed: boolean;

    @Field(() => ID)
    maxSelectRestrain: number;

    @Field(() => [OptionInputDTO])
    options: OptionInputDTO[];
}
