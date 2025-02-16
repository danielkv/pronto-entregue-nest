import { Field, Int, ObjectType } from '@nestjs/graphql';
import { PageInfo } from '../../../common/types/page-info';
import { IListEntity } from '../../../common/interfaces/IListEntity';
import { User } from '../entities/user.entity';

@ObjectType('UserList')
export class UserListDTO implements IListEntity<User> {
    @Field(() => [User], { nullable: 'items' })
    items?: User[];

    @Field(() => Int)
    countItems?: number;

    @Field(() => PageInfo, { nullable: true })
    pageInfo?: PageInfo;
}
