import { Field, Float, ID, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { CompanyPaymentMethod } from '../../company-association/company/entities/company.payment.method.entity';
import { Order } from '../../order-association/order/entities/order.entity';
import { PaymentMethodFeeTypeEnum } from '../enums/payment-method-fee-type.enum';
import { PaymentMethodTypeEnum } from '../enums/payment-method-type.enum';

registerEnumType(PaymentMethodTypeEnum, { name: 'PaymentMethodTypeEnum' });
registerEnumType(PaymentMethodFeeTypeEnum, { name: 'PaymentMethodFeeTypeEnum' });

@ObjectType()
@Entity('payment_methods')
export class PaymentMethod {
    @Field(() => ID)
    @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
    id: number;

    @Field(() => PaymentMethodTypeEnum)
    @Column('enum', {
        name: 'type',
        enum: PaymentMethodTypeEnum,
        default: PaymentMethodTypeEnum.DELIVERY,
    })
    type: PaymentMethodTypeEnum;

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

    @Field(() => PaymentMethodFeeTypeEnum)
    @Column('enum', {
        name: 'feeType',
        enum: PaymentMethodFeeTypeEnum,
        default: PaymentMethodFeeTypeEnum.PERCENTAGE,
    })
    feeType: PaymentMethodFeeTypeEnum;

    @Column({ type: 'boolean', name: 'active', default: true })
    active: boolean;

    @Field()
    @CreateDateColumn({ name: 'createdAt' })
    createdAt: Date;

    @Field()
    @UpdateDateColumn({ name: 'updatedAt' })
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
