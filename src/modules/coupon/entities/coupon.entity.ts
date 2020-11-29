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
import { Product } from '../../product-association/product/entities/product.entity';
import { User } from '../../user-association/user/entities/user.entity';
import { Company } from '../../company-association/company/entities/company.entity';
import { CouponValueType } from '../enums/coupon-valye-type.enum';

@Entity('coupons')
export class Coupon {
    @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
    id: number;

    @Column('varchar', { name: 'name', nullable: true, length: 255 })
    name: string | null;

    @Column('text', { name: 'image', nullable: true })
    image: string | null;

    @Column('datetime', { name: 'startsAt', nullable: true })
    startsAt: Date | null;

    @Column('datetime', { name: 'expiresAt', nullable: true })
    expiresAt: Date | null;

    @Column('varchar', { name: 'description', nullable: true, length: 255 })
    description: string | null;

    @Column({
        type: 'boolean',
        name: 'masterOnly',
        nullable: true,
        comment: 'Se verdadeiro, apenas usuário master consegue alterar',
        default: false,
    })
    masterOnly: boolean | null;

    @Column({
        type: 'boolean',
        name: 'onlyFirstPurchases',
        nullable: true,
        comment: 'Se verdadeiro, apenas válido apenas para primeira compra de cada usuário',
        default: false,
    })
    onlyFirstPurchases: boolean | null;

    @Column({
        type: 'boolean',
        name: 'featured',
        nullable: true,
        comment: 'Se verdadeiro, usuário pode pegar cupom na home do app',
        default: false,
    })
    featured: boolean | null;

    @Column({
        type: 'boolean',
        name: 'active',
        nullable: true,
        default: true,
    })
    active: boolean | null;

    @Column('decimal', {
        name: 'taxable',
        nullable: true,
        comment: 'Porcentagem do cupom que será pago pelo estabelecimento',
        precision: 10,
        scale: 2,
        default: '100.00',
    })
    taxable: number | null;

    @Column('int', { name: 'maxPerUser', nullable: true, default: 1 })
    maxPerUser: number | null;

    @Column('int', { name: 'maxPurchases', nullable: true, default: 0 })
    maxPurchases: number | null;

    @Column('decimal', {
        name: 'minValue',
        nullable: true,
        precision: 10,
        scale: 2,
        default: '0.00',
    })
    minValue: number | null;

    @Column('decimal', {
        name: 'maxValue',
        nullable: true,
        precision: 10,
        scale: 2,
        default: '0.00',
    })
    maxValue: number | null;

    @Column('enum', {
        name: 'valueType',
        enum: CouponValueType,
        default: CouponValueType.PERCENTAGE,
    })
    valueType: CouponValueType;

    @Column('decimal', {
        name: 'value',
        nullable: true,
        precision: 2,
        scale: 0,
    })
    value: number | null;

    @Column({ type: 'boolean', name: 'freeDelivery', default: false })
    freeDelivery: boolean;

    @CreateDateColumn({ name: 'createdAt' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updatedAt' })
    updatedAt: Date;

    @ManyToMany(
        () => Company,
        company => company.coupons,
        { cascade: true },
    )
    @JoinTable({
        name: 'coupon_companies',
        joinColumn: { name: 'couponId' },
        inverseJoinColumn: { name: 'companyId' },
    })
    companies: Company[];

    @ManyToMany(
        () => Product,
        product => product.coupons,
        { cascade: true },
    )
    @JoinTable({
        name: 'coupon_products',
        joinColumn: { name: 'couponId' },
        inverseJoinColumn: { name: 'productId' },
    })
    products: Product[];

    @ManyToMany(
        () => User,
        user => user.coupons,
        { cascade: true },
    )
    @JoinTable({
        name: 'coupon_users',
        joinColumn: { name: 'couponId' },
        inverseJoinColumn: { name: 'userId' },
    })
    users: User[];

    @OneToMany(
        () => Order,
        orders => orders.coupon,
    )
    orders: Order[];
}
