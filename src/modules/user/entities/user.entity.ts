import {
    Column,
    Entity,
    Index,
    JoinTable,
    ManyToMany,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { CompanyUser } from '../../company/entities/company.user.entity';
import { CreditBalance } from '../../credit/credit.balance.entity';
import { CreditHistory } from '../../credit/credit.history.entity';
import { Delivery } from '../../delivery/entities/delivery.entity';
import { Order } from '../../order/order.entity';
import { Rating } from '../../rating/rating.entity';
import { UserMeta } from './user.meta.entity';
import { Coupon } from '../../coupon/coupon.entity';
import { Product } from '../../product/entities/product.entity';
import { Address } from '../../address/entities/address.entity';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Index('email', ['email'], { unique: true })
@Entity('users')
export class User {
    @Field(() => ID)
    @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
    id: number;

    @Field()
    @Column('varchar', { name: 'firstName', nullable: true, length: 255 })
    firstName: string | null;

    @Field()
    @Column('varchar', { name: 'lastName', nullable: true, length: 255 })
    lastName: string | null;

    @Field()
    @Column('text', { name: 'image', nullable: true })
    image: string | null;

    @Field()
    @Column('varchar', {
        name: 'email',
        nullable: true,
        unique: true,
        length: 255,
    })
    email: string | null;

    @Field()
    @Column('varchar', { name: 'password', nullable: true, length: 255 })
    password: string | null;

    @Field()
    @Column('varchar', { name: 'salt', nullable: true, length: 255 })
    salt: string | null;

    @Field()
    @Column({
        type: 'boolean',
        name: 'active',
        nullable: true,
        default: true,
    })
    active: boolean | null;

    @Field()
    @Column('varchar', {
        name: 'role',
        comment: 'master | default',
        length: 255,
        default: 'default',
    })
    role: string;

    @Field()
    @Column('datetime', { name: 'createdAt' })
    createdAt: Date;

    @Field()
    @Column('datetime', { name: 'updatedAt' })
    updatedAt: Date;

    @Field(() => [CompanyUser])
    @OneToMany(
        () => CompanyUser,
        companyUsers => companyUsers.user,
    )
    companyUsers: CompanyUser[];

    @Field(() => [Coupon])
    @ManyToMany(
        () => Coupon,
        coupon => coupon.users,
    )
    coupons: Coupon[];

    @Field()
    @OneToOne(
        () => CreditBalance,
        creditBalances => creditBalances.user,
    )
    creditBalance: CreditBalance;

    @Field(() => [CreditHistory])
    @OneToMany(
        () => CreditHistory,
        creditHistory => creditHistory.user,
    )
    creditHistories: CreditHistory[];

    @Field(() => [Delivery])
    @OneToMany(
        () => Delivery,
        deliveries => deliveries.deliveryMan,
    )
    deliveries: Delivery[];

    @Field(() => [Product])
    @ManyToMany(
        () => Product,
        product => product.favoritedBy,
    )
    @JoinTable({
        name: 'favorite_products',
        joinColumn: { name: 'userId' },
        inverseJoinColumn: { name: 'productId' },
    })
    favoriteProducts: Product[];

    @Field(() => [Order])
    @OneToMany(
        () => Order,
        orders => orders.user,
    )
    orders: Order[];

    @Field(() => [Rating])
    @OneToMany(
        () => Rating,
        ratings => ratings.user,
    )
    ratings: Rating[];

    @Field(() => [Address])
    @ManyToMany(
        () => Address,
        address => address.users,
    )
    @JoinTable({
        name: 'user_addresses',
        joinColumn: { name: 'userId' },
        inverseJoinColumn: { name: 'addressId' },
    })
    addresses: Address[];

    @Field(() => [UserMeta])
    @OneToMany(
        () => UserMeta,
        userMetas => userMetas.user,
    )
    metas: UserMeta[];
}
