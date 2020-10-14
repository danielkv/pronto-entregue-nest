import {
    Column,
    CreateDateColumn,
    Entity,
    Index,
    JoinColumn,
    JoinTable,
    ManyToMany,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Category } from '../../../category/entities/category.entity';
import { CompanySection } from '../../company-section/entities/company.type.entity';
import { Address } from '../../../address/entities/address.entity';
import { CompanyMeta } from '../../company-meta/entities/company.meta.entity';
import { CompanyPaymentMethod } from './company.payment.method.entity';
import { CompanyUser } from './company.user.entity';
import { DeliveryArea } from '../../../delivery-area/entities/delivery.area.entity';
import { Order } from '../../../order-association/order/entities/order.entity';
import { Product } from '../../../product-association/product/entities/product.entity';
import { Rating } from '../../../rating/entities/rating.entity';
import { PickUpArea } from '../../../pickup/entities/pickup-area.entity';
import { Coupon } from '../../../coupon/entities/coupon.entity';

import { Field, Float, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
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

    @Column('int', { name: 'addressId', nullable: true })
    addressId: number | null;

    @OneToMany(
        () => Category,
        categories => categories.company,
    )
    categories: Category[];

    @Field(() => [CompanySection])
    @ManyToMany(
        () => CompanySection,
        companyTypes => companyTypes.companies,
        {
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        },
    )
    @JoinTable({
        name: 'companies_to_sections',
        joinColumn: { name: 'companyId' },
        inverseJoinColumn: { name: 'companySectionId' },
    })
    sections: CompanySection[];

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

    @OneToMany(
        () => CompanyPaymentMethod,
        companyPaymentMethods => companyPaymentMethods.company,
    )
    companyPaymentMethods: CompanyPaymentMethod[];

    @OneToMany(
        () => CompanyUser,
        companyUsers => companyUsers.company,
    )
    companyUsers: CompanyUser[];

    @Field(() => [Coupon], { nullable: 'items' })
    @ManyToMany(
        () => Coupon,
        coupon => coupon.companies,
    )
    coupons: Coupon[];

    @OneToMany(
        () => DeliveryArea,
        deliveryAreas => deliveryAreas.company,
    )
    deliveryAreas: DeliveryArea[];

    @OneToMany(
        () => PickUpArea,
        pickUpArea => pickUpArea.company,
    )
    pickUpAreas: PickUpArea[];

    @OneToMany(
        () => Order,
        orders => orders.company,
    )
    orders: Order[];

    @OneToMany(
        () => Product,
        products => products.company,
    )
    products: Product[];

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
