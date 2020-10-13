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
import { User } from '../../../user/entities/user.entity';
import { Company } from '../../../company-association/company/entities/company.entity';
import { PaymentMethod } from '../../../payment/entities/payment.method.entity';
import { CreditHistory } from '../../../credit-association/credit-history/entities/credit.history.entity';
import { Coupon } from '../../../coupon/entities/coupon.entity';
import { Rating } from '../../../rating/entities/rating.entity';
import { Field, Float, ID, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { OrderStatusEnum } from '../enums/order.status.enum';
import { OrderTypeEnum } from '../enums/order.type.enum';
import { GeoPoint } from '../../../common/types/geo-point';
import { GeoPointHelper } from '../../../common/helpers/geo.point.helper';

const geoPointHelper = new GeoPointHelper();

registerEnumType(OrderStatusEnum, { name: 'OrderStatusEnum' });
registerEnumType(OrderTypeEnum, { name: 'OrderTypeEnum' });

@ObjectType()
@Index('userId', ['userId'], {})
@Index('companyId', ['companyId'], {})
@Index('paymentMethodId', ['paymentMethodId'], {})
@Index('creditHistoryId', ['creditHistoryId'], {})
@Index('orders_couponId_foreign_idx', ['couponId'], {})
@Entity('orders')
export class Order {
    @Field(() => ID)
    @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
    id: number;

    @Field(() => Float)
    @Column('decimal', {
        name: 'paymentFee',
        nullable: true,
        precision: 10,
        scale: 2,
    })
    paymentFee: number | null;

    @Field(() => Float)
    @Column('decimal', {
        name: 'deliveryPrice',
        nullable: true,
        precision: 10,
        scale: 2,
    })
    deliveryPrice: number | null;

    @Field(() => Int)
    @Column('int', { name: 'deliveryTime', default: 0 })
    deliveryTime: number;

    @Field(() => OrderTypeEnum)
    @Column('enum', {
        name: 'type',
        enum: OrderTypeEnum,
        default: OrderTypeEnum.DELIVERY,
    })
    type: OrderTypeEnum;

    @Field(() => Float)
    @Column('decimal', {
        name: 'price',
        nullable: true,
        precision: 10,
        scale: 2,
    })
    price: number | null;

    @Field(() => Float)
    @Column('decimal', {
        name: 'discount',
        nullable: true,
        precision: 10,
        scale: 2,
    })
    discount: number | null;

    @Field(() => OrderStatusEnum)
    @Column('enum', {
        name: 'status',
        nullable: true,
        enum: OrderStatusEnum,
        default: OrderStatusEnum.WAITING,
    })
    status: OrderStatusEnum;

    @Field({ nullable: true })
    @Column('text', { name: 'message', nullable: true })
    message: string | null;

    @Column('varchar', { name: 'nameAddress', nullable: true, length: 255 })
    nameAddress: string | null;

    @Column('varchar', { name: 'streetAddress', nullable: true, length: 255 })
    streetAddress: string | null;

    @Column('int', { name: 'numberAddress', nullable: true })
    numberAddress: number | null;

    @Column('varchar', {
        name: 'complementAddress',
        nullable: true,
        length: 255,
    })
    complementAddress: string | null;

    @Column('varchar', {
        name: 'referenceAddress',
        nullable: true,
        length: 255,
    })
    referenceAddress: string | null;

    @Column('varchar', { name: 'districtAddress', nullable: true, length: 255 })
    districtAddress: string | null;

    @Column('int', { name: 'zipcodeAddress', nullable: true })
    zipcodeAddress: number | null;

    @Column('varchar', { name: 'cityAddress', nullable: true, length: 255 })
    cityAddress: string | null;

    @Column('varchar', { name: 'stateAddress', nullable: true, length: 255 })
    stateAddress: string | null;

    @Column('point', {
        name: 'locationAddress',
        nullable: true,
        transformer: { to: geoPointHelper.geoPointToText, from: geoPointHelper.textToGeoPoint },
    })
    locationAddress: GeoPoint;

    @Field()
    @CreateDateColumn({ name: 'createdAt' })
    createdAt: Date;

    @Field()
    @UpdateDateColumn({ name: 'updatedAt' })
    updatedAt: Date;

    @Column('int', { name: 'userId', nullable: true })
    userId: number | null;

    @Column('int', { name: 'companyId', nullable: true })
    companyId: number | null;

    @Column('int', { name: 'paymentMethodId', nullable: true })
    paymentMethodId: number | null;

    @Column('int', { name: 'creditHistoryId', nullable: true })
    creditHistoryId: number | null;

    @Column('int', { name: 'couponId', nullable: true })
    couponId: number | null;

    @Field({ nullable: true })
    @Column('datetime', { name: 'scheduledTo', nullable: true })
    scheduledTo: Date | null;

    @OneToMany(
        () => Delivery,
        deliveries => deliveries.order,
    )
    deliveries: Delivery[];

    @OneToMany(
        () => OrderProduct,
        orderProducts => orderProducts.order,
    )
    orderProducts: OrderProduct[];

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
