import { Field, ID, ObjectType } from '@nestjs/graphql';
import { FilterableConnection, FilterableField, FilterableRelation } from '@nestjs-query/query-graphql';
import { AddressDTO } from 'src/modules/address/dtos/address.dto';
import { UserMetaDTO } from '../../user-meta/dtos/user.meta.dto';

@ObjectType('User')
@FilterableRelation('metas', () => [UserMetaDTO])
@FilterableConnection('addresses', () => AddressDTO, { disableRemove: true, disableUpdate: true })
export class UserDTO {
    @FilterableField(() => ID)
    id: number;

    @FilterableField()
    firstName: string;

    @FilterableField({ nullable: true })
    lastName: string;

    @Field({ nullable: true })
    image: string;

    @FilterableField()
    email: string;

    @FilterableField()
    active: boolean;

    @FilterableField()
    role: string;

    @FilterableField()
    isMaster: boolean;

    @FilterableField()
    createdAt: Date;

    //coupons: Coupon[];

    //creditBalance: CreditBalance;

    //creditHistories: CreditHistory[];

    //favoriteProducts: Product[];

    //orders: Order[];

    //ratings: Rating[];

    //addresses: Address[];
}
