import { FilterableField, Relation } from '@nestjs-query/query-graphql';
import { Field, Float, ID, ObjectType } from '@nestjs/graphql';
import { IsInt, IsNumber, IsOptional, IsString } from 'class-validator';
import { OptionDTO } from 'src/modules/product-association/option/dtos/option.dto';

@ObjectType('OrderOption')
@Relation('relatedOption', () => OptionDTO)
export class OrderOptionDTO {
    @IsOptional()
    @IsInt()
    @FilterableField(() => ID)
    id?: number;

    @IsString()
    @FilterableField()
    name: string;

    @IsString()
    @FilterableField()
    description: string;

    @IsNumber()
    @Field(() => Float)
    price: number;

    @IsInt()
    @FilterableField(() => ID)
    optionRelatedId: number;
}
