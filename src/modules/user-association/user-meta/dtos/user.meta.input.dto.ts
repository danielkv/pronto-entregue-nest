import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNumber, IsString } from 'class-validator';
import { UserMeta } from '../entities/user.meta.entity';

@InputType('UserMetaInput')
export class UserMetaInputDTO {
    @IsNumber()
    @Field(() => Int, { nullable: true })
    id?: UserMeta['id'];

    @IsString()
    @Field({ nullable: true })
    key?: string;

    @IsString()
    @Field({ nullable: true })
    value?: string;

    @IsNumber()
    @Field({ nullable: true })
    userId?: number;
}
