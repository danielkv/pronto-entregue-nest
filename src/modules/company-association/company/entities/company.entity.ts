import {
    Column,
    CreateDateColumn,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Category } from '../../../category/entities/category.entity';
import { CompanySection } from './company.type.entity';
import { Address } from '../../../address/entities/address.entity';
import { CompanyMeta } from '../../company-meta/entities/company.meta.entity';
import { CompanyPaymentMethod } from './company.payment.method.entity';
import { CompanyUser } from './company.user.entity';
import { DeliveryArea } from '../../../delivery-area/entities/delivery.area.entity';
import { Order } from '../../../order-association/order/entities/order.entity';
import { Product } from '../../../product/entities/product.entity';
import { Rating } from '../../../rating/entities/rating.entity';
import { PickUpArea } from '../../../pickup/entities/pickup-area.entity';
import { PaymentMethod } from '../../../payment/entities/payment.method.entity';
import { Coupon } from '../../../coupon/entities/coupon.entity';

import { Field, Float, ID, ObjectType } from '@nestjs/graphql';

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
    @CreateDateColumn({ name: 'createdAt' })
    createdAt: Date;

    @Field()
    @UpdateDateColumn({ name: 'updatedAt' })
    updatedAt: Date;

    @Column('int', { name: 'companyTypeId', nullable: true })
    companyTypeId: number | null;

    @Column('int', { name: 'addressId', nullable: true })
    addressId: number | null;

    @Field(() => [Category], { nullable: 'items' })
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

    @OneToMany(
        () => CompanyMeta,
        companyMetas => companyMetas.company,
    )
    metas: CompanyMeta[];

    @Field(() => [PaymentMethod], { nullable: 'items' })
    @OneToMany(
        () => CompanyPaymentMethod,
        companyPaymentMethods => companyPaymentMethods.company,
    )
    companyPaymentMethods: CompanyPaymentMethod[];

    @Field(() => [CompanyUser], { nullable: 'items' })
    @OneToMany(
        () => CompanyUser,
        companyUsers => companyUsers.company,
    )
    companyUsers: CompanyUser[];

    @Field(() => [Coupon], { nullable: 'items' })
    @OneToMany(
        () => Coupon,
        coupon => coupon.companies,
    )
    coupons: Coupon[];

    //@Field(() => [DeliveryArea], { nullable: 'items' })
    @OneToMany(
        () => DeliveryArea,
        deliveryAreas => deliveryAreas.company,
    )
    deliveryAreas: DeliveryArea[];

    //@Field(() => [PickUpArea], { nullable: 'items' })
    @OneToMany(
        () => PickUpArea,
        pickUpArea => pickUpArea.company,
    )
    pickUpAreas: PickUpArea[];

    @Field(() => [Order], { nullable: 'items' })
    @OneToMany(
        () => Order,
        orders => orders.company,
    )
    orders: Order[];

    @Field(() => [Product], { nullable: 'items' })
    @OneToMany(
        () => Product,
        products => products.company,
    )
    products: Product[];

    @Field(() => [Rating], { nullable: 'items' })
    @OneToMany(
        () => Rating,
        ratings => ratings.company,
    )
    ratings: Rating[];

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
}
