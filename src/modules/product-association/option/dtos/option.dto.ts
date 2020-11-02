import { Field, Float, InputType, Int } from '@nestjs/graphql';
import { IsBoolean, IsInt, IsNumber, IsOptional, IsString } from 'class-validator';

@InputType('OptionInput')
export class OptionDTO {
    @IsOptional()
    @IsInt()
    @Field(() => Int, { nullable: true })
    id?: number;

    @IsString()
    @Field()
    name: string;

    @IsString()
    @Field()
    description: string;

    @IsInt()
    @Field(() => Int)
    order: number;

    @IsInt()
    @Field(() => Int)
    maxSelectRestrainOther: number;

    @IsBoolean()
    @Field()
    active: boolean;

    @IsBoolean()
    @Field()
    removed: boolean;

    @IsNumber()
    @Field(() => Float)
    price: number;
}
