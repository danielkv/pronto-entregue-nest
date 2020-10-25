import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { IsArray, IsBoolean, IsString, ValidateNested } from 'class-validator';
import { UserMetaInputDTO } from '../../user-meta/dtos/user.meta.input.dto';

@InputType('UserInput')
export class UserInputDTO {
    @IsString()
    @Field({ nullable: true })
    firstName?: string;

    @IsString()
    @Field({ nullable: true })
    lastName?: string;

    @IsString()
    @Field({ nullable: true })
    image?: string;

    @IsString()
    @Field({ nullable: true })
    email?: string;

    @IsString()
    @Field({ nullable: true })
    password?: string;

    @IsBoolean()
    @Field({ nullable: true })
    active?: boolean;

    @IsString()
    @Field({ nullable: true })
    role?: string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => UserMetaInputDTO)
    @Field(() => [UserMetaInputDTO], { nullable: true })
    metas?: UserMetaInputDTO[];
}
