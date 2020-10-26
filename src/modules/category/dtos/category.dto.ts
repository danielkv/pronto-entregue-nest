import { Field, InputType, Int } from '@nestjs/graphql';
import { IsBoolean, IsInt, IsString } from 'class-validator';

@InputType('CategoryInput')
export class CategoryDTO {
    @IsInt()
    @Field(() => Int, { nullable: true })
    id?: number;

    @IsString()
    @Field()
    name: string;

    @IsString()
    @Field({ nullable: true })
    image?: string;

    @IsString()
    @Field({ nullable: true })
    description?: string;

    @IsBoolean()
    @Field()
    active: boolean;

    @IsInt()
    @Field(() => Int)
    order: number;
}
