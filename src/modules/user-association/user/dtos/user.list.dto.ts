import { Field, Int, ObjectType } from '@nestjs/graphql';
import { PageInfo } from '../../../common/types/page-info';
import { IListEntity } from '../../../common/interfaces/IListEntity';
import { User } from '../entities/user.entity';

@ObjectType('listUsers')
export class ListUsersDTO implements IListEntity<User> {
    @Field(() => [User], { nullable: 'items' })
    items?: User[];

    @Field(() => Int)
    countItems?: number;

    @Field(() => PageInfo, { nullable: true })
    pageInfo?: PageInfo;
}
