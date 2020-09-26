import {
    Field,
    Float,
    ID,
    Int,
    ObjectType,
    registerEnumType,
} from '@nestjs/graphql';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CompanyPaymentMethod } from '../company/entities/company.payment.method.entity';
import { Order } from '../order/order.entity';

export enum PaymentMethodType {
    MONEY = 'money',
    DELIVERY = 'delivery',
    ONLINE = 'app',
}

export enum PaymentMethodFeeType {
    VALUE = 'value',
    PERCENTAGE = 'pct',
}

registerEnumType(PaymentMethodType, { name: 'PaymentMethodType' });
registerEnumType(PaymentMethodFeeType, { name: 'PaymentMethodFeeType' });

@ObjectType()
@Entity('payment_methods')
export class PaymentMethod {
    @Field(() => ID)
    @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
    id: number;

    @Field(() => PaymentMethodType)
    @Column('enum', {
        name: 'type',
        enum: PaymentMethodType,
        default: PaymentMethodType.DELIVERY,
    })
    type: PaymentMethodType;

    @Field()
    @Column('varchar', { name: 'displayName', nullable: true, length: 255 })
    displayName: string | null;

    @Field()
    @Column('text', { name: 'image', nullable: true })
    image: string | null;

    @Field(() => Int)
    @Column('int', { name: 'order', default: 0 })
    order: number;

    @Field(() => Float)
    @Column('decimal', {
        name: 'fee',
        precision: 10,
        scale: 2,
        default: 0,
    })
    fee: number;

    @Field(() => PaymentMethodFeeType)
    @Column('enum', {
        name: 'feeType',
        enum: PaymentMethodFeeType,
        default: PaymentMethodFeeType.PERCENTAGE,
    })
    feeType: PaymentMethodFeeType;

    @Column({ type: 'boolean', name: 'active', default: true })
    active: boolean;

    @Field()
    @Column('datetime', { name: 'createdAt' })
    createdAt: Date;

    @Field()
    @Column('datetime', { name: 'updatedAt' })
    updatedAt: Date;

    @Field(() => [CompanyPaymentMethod])
    @OneToMany(
        () => CompanyPaymentMethod,
        companyPaymentMethods => companyPaymentMethods.paymentMethod,
    )
    companyPaymentMethods: CompanyPaymentMethod[];

    @Field(() => [Order])
    @OneToMany(
        () => Order,
        orders => orders.paymentMethod,
    )
    orders: Order[];
}
