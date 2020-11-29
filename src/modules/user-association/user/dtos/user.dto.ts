import { Field, ID, ObjectType } from '@nestjs/graphql';
import { FilterableField } from '@nestjs-query/query-graphql';

@ObjectType('User')
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

    @FilterableField()
    updatedAt: Date;

    //coupons: Coupon[];

    //creditBalance: CreditBalance;

    //creditHistories: CreditHistory[];

    //favoriteProducts: Product[];

    //orders: Order[];

    //ratings: Rating[];

    //addresses: Address[];

    //metas: UserMeta[];
}
