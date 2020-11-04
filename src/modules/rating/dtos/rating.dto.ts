import { Field, InputType, Int } from '@nestjs/graphql';
import { IsBoolean, IsInt, IsOptional, IsString } from 'class-validator';

@InputType('RatingInput')
export class RatingDTO {
    @IsOptional()
    @IsInt()
    @Field(() => Int)
    id?: number;

    @IsInt()
    @Field(() => Int)
    rate: number;

    @IsString()
    @Field()
    comment: string;

    @IsBoolean()
    @Field()
    hidden: boolean;

    @IsInt()
    @Field()
    companyId: number;

    @IsInt()
    @Field()
    orderId: number;

    @IsInt()
    @Field()
    userId: number;
}
