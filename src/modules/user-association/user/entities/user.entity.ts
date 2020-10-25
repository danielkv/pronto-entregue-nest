import {
    Column,
    CreateDateColumn,
    Entity,
    Index,
    JoinTable,
    ManyToMany,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { CompanyUser } from '../../../company-association/company-user/entities/company.user.entity';
import { CreditBalance } from '../../../credit-association/credit-balance/entities/credit.balance.entity';
import { CreditHistory } from '../../../credit-association/credit-history/entities/credit.history.entity';
import { Delivery } from '../../../delivery/entities/delivery.entity';
import { Order } from '../../../order-association/order/entities/order.entity';
import { Rating } from '../../../rating/entities/rating.entity';
import { UserMeta } from '../../user-meta/entities/user.meta.entity';
import { Coupon } from '../../../coupon/entities/coupon.entity';
import { Product } from '../../../product-association/product/entities/product.entity';
import { Address } from '../../../address/entities/address.entity';
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

    @Field({ nullable: true })
    @Column('varchar', { name: 'lastName', nullable: true, length: 255 })
    lastName: string | null;

    @Field({ nullable: true })
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

    @Column('varchar', { name: 'password', nullable: true, length: 255 })
    password: string | null;

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
        default: 'customer',
    })
    role: string;

    @Field()
    @Column('boolean', {
        name: 'isMaster',
        default: false,
    })
    isMaster: boolean;

    @Field()
    @CreateDateColumn({ name: 'createdAt' })
    createdAt: Date;

    @Field()
    @UpdateDateColumn({ name: 'updatedAt' })
    updatedAt: Date;

    @OneToMany(
        () => CompanyUser,
        companyUsers => companyUsers.user,
    )
    companyUsers: CompanyUser[];

    @ManyToMany(
        () => Coupon,
        coupon => coupon.users,
    )
    coupons: Coupon[];

    @OneToOne(
        () => CreditBalance,
        creditBalances => creditBalances.user,
    )
    creditBalance: CreditBalance;

    @OneToMany(
        () => CreditHistory,
        creditHistory => creditHistory.user,
    )
    creditHistories: CreditHistory[];

    @OneToMany(
        () => Delivery,
        deliveries => deliveries.deliveryMan,
    )
    deliveries: Delivery[];

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

    @OneToMany(
        () => Order,
        orders => orders.user,
    )
    orders: Order[];

    @OneToMany(
        () => Rating,
        ratings => ratings.user,
    )
    ratings: Rating[];

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

    @OneToMany(
        () => UserMeta,
        userMetas => userMetas.user,
    )
    metas: UserMeta[];
}
