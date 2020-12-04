import {
    Column,
    CreateDateColumn,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Delivery } from '../../../delivery/entities/delivery.entity';
import { OrderProduct } from '../../order-product/entities/order.product.entity';
import { User } from '../../../user-association/user/entities/user.entity';
import { Company } from '../../../company-association/company/entities/company.entity';
import { PaymentMethod } from '../../../payment/entities/payment.method.entity';
import { CreditHistory } from '../../../credit-association/credit-history/entities/credit.history.entity';
import { Coupon } from '../../../coupon/entities/coupon.entity';
import { Rating } from '../../../rating/entities/rating.entity';

import { OrderStatusEnum } from '../enums/order.status.enum';
import { OrderType, OrderTypeEnum } from '../enums/order.type.enum';
import { GeoPoint } from '../../../common/types/geo-point';
import { GeoPointHelper } from '../../../common/helpers/geo.point.helper';

const geoPointHelper = new GeoPointHelper();

@Index('userId', ['userId'], {})
@Index('companyId', ['companyId'], {})
@Index('paymentMethodId', ['paymentMethodId'], {})
@Index('creditHistoryId', ['creditHistoryId'], {})
@Index('orders_couponId_foreign_idx', ['couponId'], {})
@Entity('orders')
export class Order {
    @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
    id: number;

    @Column('decimal', {
        name: 'paymentFee',
        nullable: true,
        precision: 10,
        scale: 2,
    })
    paymentFee: number;

    @Column('decimal', {
        name: 'deliveryPrice',
        nullable: true,
        precision: 10,
        scale: 2,
    })
    deliveryPrice: number;

    @Column('int', { name: 'deliveryTime', default: 0 })
    deliveryTime: number;

    @Column('enum', {
        name: 'type',
        enum: OrderTypeEnum,
        default: OrderTypeEnum.DELIVERY,
    })
    type: OrderType;

    @Column('decimal', {
        name: 'price',
        nullable: true,
        precision: 10,
        scale: 2,
    })
    price: number;

    @Column('decimal', {
        name: 'discount',
        nullable: true,
        precision: 10,
        scale: 2,
    })
    discount: number;

    @Column('enum', {
        name: 'status',
        nullable: true,
        enum: OrderStatusEnum,
        default: OrderStatusEnum.WAITING,
    })
    status: OrderStatusEnum;

    @Column('text', { name: 'message', nullable: true })
    message: string;

    @Column('varchar', { name: 'nameAddress', nullable: true, length: 255 })
    nameAddress: string;

    @Column('varchar', { name: 'streetAddress', nullable: true, length: 255 })
    streetAddress: string;

    @Column('int', { name: 'numberAddress', nullable: true })
    numberAddress: number;

    @Column('varchar', {
        name: 'complementAddress',
        nullable: true,
        length: 255,
    })
    complementAddress: string;

    @Column('varchar', {
        name: 'referenceAddress',
        nullable: true,
        length: 255,
    })
    referenceAddress: string;

    @Column('varchar', { name: 'districtAddress', nullable: true, length: 255 })
    districtAddress: string;

    @Column('int', { name: 'zipcodeAddress', nullable: true })
    zipcodeAddress: number;

    @Column('varchar', { name: 'cityAddress', nullable: true, length: 255 })
    cityAddress: string;

    @Column('varchar', { name: 'stateAddress', nullable: true, length: 255 })
    stateAddress: string;

    @Column('point', {
        name: 'locationAddress',
        nullable: true,
        transformer: { to: geoPointHelper.geoPointToText, from: geoPointHelper.textToGeoPoint },
    })
    locationAddress: GeoPoint;

    @CreateDateColumn({ name: 'createdAt' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updatedAt' })
    updatedAt: Date;

    @Column('int', { name: 'userId', nullable: true })
    userId: number;

    @Column('int', { name: 'companyId', nullable: true })
    companyId: number;

    @Column('int', { name: 'paymentMethodId', nullable: true })
    paymentMethodId: number;

    @Column('int', { name: 'creditHistoryId', nullable: true })
    creditHistoryId: number;

    @Column('int', { name: 'couponId', nullable: true })
    couponId: number;

    @Column('datetime', { name: 'scheduledTo', nullable: true })
    scheduledTo: Date;

    @OneToMany(
        () => Delivery,
        deliveries => deliveries.order,
    )
    deliveries: Delivery[];

    @OneToMany(
        () => OrderProduct,
        orderProducts => orderProducts.order,
        { cascade: true },
    )
    products: OrderProduct[];

    @ManyToOne(
        () => User,
        users => users.orders,
        {
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
        },
    )
    @JoinColumn([{ name: 'userId', referencedColumnName: 'id' }])
    user: User;

    @ManyToOne(
        () => Company,
        companies => companies.orders,
        {
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
        },
    )
    @JoinColumn([{ name: 'companyId', referencedColumnName: 'id' }])
    company: Company;

    @ManyToOne(
        () => PaymentMethod,
        paymentMethods => paymentMethods.orders,
        {
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
        },
    )
    @JoinColumn([{ name: 'paymentMethodId', referencedColumnName: 'id' }])
    paymentMethod: PaymentMethod;

    @OneToOne(
        () => CreditHistory,
        creditHistory => creditHistory.order,
        {
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
        },
    )
    @JoinColumn([{ name: 'creditHistoryId', referencedColumnName: 'id' }])
    creditHistory: CreditHistory;

    @ManyToOne(
        () => Coupon,
        coupons => coupons.orders,
        {
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
        },
    )
    @JoinColumn([{ name: 'couponId', referencedColumnName: 'id' }])
    coupon: Coupon;

    @OneToOne(
        () => Rating,
        ratings => ratings.order,
    )
    rating: Rating;
}
