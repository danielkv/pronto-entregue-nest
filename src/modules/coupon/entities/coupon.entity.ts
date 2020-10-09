import {
    Column,
    CreateDateColumn,
    Entity,
    JoinTable,
    ManyToMany,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Order } from '../../order-association/order/entities/order.entity';
import { Product } from '../../product/entities/product.entity';
import { User } from '../../user/entities/user.entity';
import { Company } from '../../company-association/company/entities/company.entity';
import { Field, Float, ID, Int, ObjectType, registerEnumType } from '@nestjs/graphql';

export enum CouponValueType {
    VALUE = 'value',
    PERCENTAGE = 'percentage',
}

registerEnumType(CouponValueType, { name: 'CouponValueType' });

@ObjectType()
@Entity('coupons')
export class Coupon {
    @Field(() => ID)
    @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
    id: number;

    @Field()
    @Column('varchar', { name: 'name', nullable: true, length: 255 })
    name: string | null;

    @Field()
    @Column('text', { name: 'image', nullable: true })
    image: string | null;

    @Field()
    @Column('datetime', { name: 'startsAt', nullable: true })
    startsAt: Date | null;

    @Field()
    @Column('datetime', { name: 'expiresAt', nullable: true })
    expiresAt: Date | null;

    @Field()
    @Column('varchar', { name: 'description', nullable: true, length: 255 })
    description: string | null;

    @Field()
    @Column({
        type: 'boolean',
        name: 'masterOnly',
        nullable: true,
        comment: 'Se verdadeiro, apenas usuário master consegue alterar',
        default: false,
    })
    masterOnly: boolean | null;

    @Field()
    @Column({
        type: 'boolean',
        name: 'onlyFirstPurchases',
        nullable: true,
        comment: 'Se verdadeiro, apenas válido apenas para primeira compra de cada usuário',
        default: false,
    })
    onlyFirstPurchases: boolean | null;

    @Field()
    @Column({
        type: 'boolean',
        name: 'featured',
        nullable: true,
        comment: 'Se verdadeiro, usuário pode pegar cupom na home do app',
        default: false,
    })
    featured: boolean | null;

    @Field()
    @Column({
        type: 'boolean',
        name: 'active',
        nullable: true,
        default: true,
    })
    active: boolean | null;

    @Field(() => Float)
    @Column('decimal', {
        name: 'taxable',
        nullable: true,
        comment: 'Porcentagem do cupom que será pago pelo estabelecimento',
        precision: 10,
        scale: 2,
        default: 100,
    })
    taxable: number | null;

    @Field(() => Int)
    @Column('int', { name: 'maxPerUser', nullable: true, default: 1 })
    maxPerUser: number | null;

    @Field(() => Int)
    @Column('int', { name: 'maxPurchases', nullable: true, default: 0 })
    maxPurchases: number | null;

    @Field(() => Float)
    @Column('decimal', {
        name: 'minValue',
        nullable: true,
        precision: 10,
        scale: 2,
        default: 0,
    })
    minValue: number | null;

    @Field(() => Float)
    @Column('decimal', {
        name: 'maxValue',
        nullable: true,
        precision: 10,
        scale: 2,
        default: 0,
    })
    maxValue: number | null;

    @Field(() => CouponValueType)
    @Column('enum', {
        name: 'valueType',
        enum: CouponValueType,
        default: CouponValueType.PERCENTAGE,
    })
    valueType: CouponValueType;

    @Field(() => Float)
    @Column('decimal', {
        name: 'value',
        nullable: true,
        precision: 2,
        scale: 0,
    })
    value: number | null;

    @Field()
    @Column({ type: 'boolean', name: 'freeDelivery', default: false })
    freeDelivery: boolean;

    @Field()
    @CreateDateColumn({ name: 'createdAt' })
    createdAt: Date;

    @Field()
    @UpdateDateColumn({ name: 'updatedAt' })
    updatedAt: Date;

    @Field(() => [Company])
    @ManyToMany(
        () => Company,
        company => company.coupons,
    )
    @JoinTable({
        name: 'coupon_companies',
        joinColumn: { name: 'couponId' },
        inverseJoinColumn: { name: 'companyId' },
    })
    companies: Company[];

    @Field(() => [Product])
    @ManyToMany(
        () => Product,
        product => product.coupons,
    )
    @JoinTable({
        name: 'coupon_products',
        joinColumn: { name: 'couponId' },
        inverseJoinColumn: { name: 'productId' },
    })
    products: Product[];

    @Field(() => [User])
    @ManyToMany(
        () => User,
        user => user.coupons,
    )
    @JoinTable({
        name: 'coupon_users',
        joinColumn: { name: 'couponId' },
        inverseJoinColumn: { name: 'userId' },
    })
    users: User[];

    @Field(() => [Order])
    @OneToMany(
        () => Order,
        orders => orders.coupon,
    )
    orders: Order[];
}
