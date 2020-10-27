import { Field, ID, InputType, Int } from '@nestjs/graphql';
import { IsBoolean, IsInt, IsString } from 'class-validator';

@InputType('CompanySectionInput')
export class CompanySectionDTO {
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
}
