import {
    Column,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Delivery } from '../delivery/entities/delivery.entity';
import { OrderProduct } from './order.product.entity';
import { User } from '../user/user.entity';
import { Company } from '../company/entities/company.entity';
import { PaymentMethod } from '../payment/payment.method.entity';
import { CreditHistory } from '../credit/credit.history.entity';
import { Coupon } from '../coupon/coupon.entity';
import { Rating } from '../rating/rating.entity';
import { Field, Float, ID, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
//import { GeoPointScalar } from '../common/scalars/geo-point-scalar';

export enum OrderStatus {
    WAITING = 'waiting',
    SCHEDULED = 'scheduled',
    PREPARING = 'preparing',
    WAITING_PICK_UP = 'waitingPickUp',
    WAITING_DELIVERY = 'waitingDelivery',
    DELIVERING = 'delivering',
    DELIVERED = 'delivered',
    CANCELED = 'canceled',
}

export enum OrderType {
    TAKEOUT = 'takeout',
    DELIVERY = 'delivery',
    PE_DELIVERY = 'peDelivery',
}

registerEnumType(OrderStatus, { name: 'OrderStatus' });
registerEnumType(OrderType, { name: 'OrderType' });

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

    @Field(() => OrderType)
    @Column('enum', {
        name: 'type',
        enum: OrderType,
        default: OrderType.DELIVERY,
    })
    type: OrderType;

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

    @Field(() => OrderStatus)
    @Column('enum', {
        name: 'status',
        nullable: true,
        enum: OrderStatus,
        default: OrderStatus.WAITING,
    })
    status: OrderStatus;

    @Field()
    @Column('text', { name: 'message', nullable: true })
    message: string | null;

    @Field()
    @Column('varchar', { name: 'nameAddress', nullable: true, length: 255 })
    nameAddress: string | null;

    @Field()
    @Column('varchar', { name: 'streetAddress', nullable: true, length: 255 })
    streetAddress: string | null;

    @Field(() => Int)
    @Column('int', { name: 'numberAddress', nullable: true })
    numberAddress: number | null;

    @Field()
    @Column('varchar', {
        name: 'complementAddress',
        nullable: true,
        length: 255,
    })
    complementAddress: string | null;

    @Field()
    @Column('varchar', {
        name: 'referenceAddress',
        nullable: true,
        length: 255,
    })
    referenceAddress: string | null;

    @Field()
    @Column('varchar', { name: 'districtAddress', nullable: true, length: 255 })
    districtAddress: string | null;

    @Field(() => Int)
    @Column('int', { name: 'zipcodeAddress', nullable: true })
    zipcodeAddress: number | null;

    @Field()
    @Column('varchar', { name: 'cityAddress', nullable: true, length: 255 })
    cityAddress: string | null;

    @Field()
    @Column('varchar', { name: 'stateAddress', nullable: true, length: 255 })
    stateAddress: string | null;

    @Field() //GeoPointScalar
    @Column('point', { name: 'locationAddress', nullable: true })
    locationAddress: string | null;

    @Field()
    @Column('datetime', { name: 'createdAt' })
    createdAt: Date;

    @Field()
    @Column('datetime', { name: 'updatedAt' })
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

    @Field(() => [Delivery])
    @OneToMany(
        () => Delivery,
        deliveries => deliveries.order,
    )
    deliveries: Delivery[];

    @Field(() => [OrderProduct])
    @OneToMany(
        () => OrderProduct,
        orderProducts => orderProducts.order,
    )
    orderProducts: OrderProduct[];

    @Field(() => User)
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

    @Field(() => Company)
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

    @Field(() => PaymentMethod)
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

    @Field(() => CreditHistory)
    @ManyToOne(
        () => CreditHistory,
        creditHistory => creditHistory.orders,
        {
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
        },
    )
    @JoinColumn([{ name: 'creditHistoryId', referencedColumnName: 'id' }])
    creditHistory: CreditHistory;

    @Field(() => Coupon)
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

    @Field(() => [Rating])
    @OneToMany(
        () => Rating,
        ratings => ratings.order,
    )
    ratings: Rating[];
}
