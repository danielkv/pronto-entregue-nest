import { FilterableField } from '@nestjs-query/query-graphql';
import { Int, ObjectType } from '@nestjs/graphql';
import { IsNumber, IsString } from 'class-validator';
import { UserMeta } from '../entities/user.meta.entity';

@ObjectType('UserMeta')
export class UserMetaDTO {
    @IsNumber()
    @FilterableField(() => Int, { nullable: true })
    id?: UserMeta['id'];

    @IsString()
    @FilterableField({ nullable: true })
    key?: string;

    @IsString()
    @FilterableField({ nullable: true })
    value?: string;

    @IsNumber()
    @FilterableField({ nullable: true })
    userId?: number;
}
