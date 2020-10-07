import {
    Column,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from '../../category/category.entity';
import { CompanySection } from './company.type.entity';
import { Address } from '../../address/entities/address.entity';
import { CompanyMeta } from './company.meta.entity';
import { CompanyPaymentMethod } from './company.payment.method.entity';
import { CompanyUser } from './company.user.entity';
import { DeliveryArea } from '../../delivery-area/entities/delivery.area.entity';
import { Order } from '../../order/order.entity';
import { Product } from '../../product/product.entity';
import { Rating } from '../../rating/rating.entity';
import { ViewArea } from '../../pickup/entities/view.area.entity';
import { PaymentMethod } from '../../payment/payment.method.entity';
import { Coupon } from '../../coupon/coupon.entity';

import { Field, Float, ID, ObjectType } from '@nestjs/graphql';
import { CompanyConfig } from '../dtos/company.config';

@ObjectType()
@Index('companyTypeId', ['companyTypeId'], {})
@Index('addressId', ['addressId'], {})
@Entity('companies')
export class Company {
    @Field(() => ID)
    @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
    id: number;

    @Field()
    @Column('varchar', { name: 'name', nullable: true, length: 255 })
    name: string | null;

    @Field()
    @Column('varchar', { name: 'displayName', nullable: true, length: 255 })
    displayName: string | null;

    @Field()
    @Column('text', { name: 'image', nullable: true })
    image: string | null;

    @Field()
    @Column('varchar', { name: 'backgroundColor', nullable: true, length: 10 })
    backgroundColor: string | null;

    @Field()
    @Column({ type: 'boolean', name: 'acceptTakeout', default: true })
    acceptTakeout: boolean;

    @Field()
    @Column({
        type: 'boolean',
        name: 'active',
        nullable: true,
        default: false,
    })
    active: boolean | null;

    @Field()
    @Column({ type: 'boolean', name: 'published', default: false })
    published: boolean;

    @Field()
    @Column('datetime', { name: 'createdAt' })
    createdAt: Date;

    @Field()
    @Column('datetime', { name: 'updatedAt' })
    updatedAt: Date;

    @Column('int', { name: 'companyTypeId', nullable: true })
    companyTypeId: number | null;

    @Column('int', { name: 'addressId', nullable: true })
    addressId: number | null;

    @Field(() => [Category])
    @OneToMany(
        () => Category,
        categories => categories.company,
    )
    categories: Category[];

    @Field(() => CompanySection)
    @ManyToOne(
        () => CompanySection,
        companyTypes => companyTypes.companies,
        {
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
        },
    )
    @JoinColumn([{ name: 'companyTypeId', referencedColumnName: 'id' }])
    companyType: CompanySection;

    @Field(() => Address, { nullable: true })
    @ManyToOne(
        () => Address,
        addresses => addresses.companies,
        {
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
        },
    )
    @JoinColumn([{ name: 'addressId', referencedColumnName: 'id' }])
    address: Address;

    @Field(() => [CompanyMeta])
    @OneToMany(
        () => CompanyMeta,
        companyMetas => companyMetas.company,
    )
    metas: CompanyMeta[];

    @Field(() => [PaymentMethod])
    @OneToMany(
        () => CompanyPaymentMethod,
        companyPaymentMethods => companyPaymentMethods.company,
    )
    companyPaymentMethods: CompanyPaymentMethod[];

    @Field(() => [CompanyUser])
    @OneToMany(
        () => CompanyUser,
        companyUsers => companyUsers.company,
    )
    companyUsers: CompanyUser[];

    @Field(() => [Coupon])
    @OneToMany(
        () => Coupon,
        coupon => coupon.companies,
    )
    coupons: Coupon[];

    @Field(() => [DeliveryArea])
    @OneToMany(
        () => DeliveryArea,
        deliveryAreas => deliveryAreas.company,
    )
    deliveryAreas: DeliveryArea[];

    @Field(() => [Order])
    @OneToMany(
        () => Order,
        orders => orders.company,
    )
    orders: Order[];

    @Field(() => [Product])
    @OneToMany(
        () => Product,
        products => products.company,
    )
    products: Product[];

    @Field(() => [Rating])
    @OneToMany(
        () => Rating,
        ratings => ratings.company,
    )
    ratings: Rating[];

    @Field(() => [ViewArea])
    @OneToMany(
        () => ViewArea,
        viewAreas => viewAreas.company,
    )
    viewAreas: ViewArea[];

    @Field()
    isOpen?: boolean;

    @Field({ nullable: true })
    nextOpen?: Date;

    @Field({ nullable: true })
    nextClose?: Date;

    @Field({ nullable: true })
    allowBuyClosed?: string;

    @Field(() => Float, { nullable: true })
    distance?: number;

    @Field(() => CompanyConfig)
    config: CompanyConfig;
}
