import { Field, Int, ObjectType } from '@nestjs/graphql';
import { PageInfo } from '../../../common/types/page-info';
import { IListEntity } from '../../../common/interfaces/IListEntity';
import { UserMeta } from '../entities/user.meta.entity';

@ObjectType('UserMetaList')
export class UserMetaListDTO implements IListEntity<UserMeta> {
    @Field(() => [UserMeta], { nullable: 'items' })
    items?: UserMeta[];

    @Field(() => Int)
    countItems?: number;

    @Field(() => PageInfo, { nullable: true })
    pageInfo?: PageInfo;
}
