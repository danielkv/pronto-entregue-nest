import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { CompanyPaymentMethod } from '../../company-association/company-payment-method/entities/company.payment.method.entity';
import { Order } from '../../order-association/order/entities/order.entity';
import { PaymentMethodFeeTypeEnum } from '../enums/payment-method-fee-type.enum';
import { PaymentMethodTypeEnum } from '../enums/payment-method-type.enum';

@Entity('payment_methods')
export class PaymentMethod {
    @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
    id: number;

    @Column('enum', {
        name: 'type',
        enum: PaymentMethodTypeEnum,
        default: PaymentMethodTypeEnum.DELIVERY,
    })
    type: PaymentMethodTypeEnum;

    @Column('varchar', { name: 'displayName', nullable: true, length: 255 })
    displayName: string | null;

    @Column('text', { name: 'image', nullable: true })
    image: string | null;

    @Column('int', { name: 'order', default: 0 })
    order: number;

    @Column('decimal', {
        name: 'fee',
        precision: 10,
        scale: 2,
        default: '0.00',
    })
    fee: number;

    @Column('enum', {
        name: 'feeType',
        enum: PaymentMethodFeeTypeEnum,
        default: PaymentMethodFeeTypeEnum.PERCENTAGE,
    })
    feeType: PaymentMethodFeeTypeEnum;

    @Column({ type: 'boolean', name: 'active', default: true })
    active: boolean;

    @CreateDateColumn({ name: 'createdAt' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updatedAt' })
    updatedAt: Date;

    @OneToMany(
        () => CompanyPaymentMethod,
        companyPaymentMethods => companyPaymentMethods.paymentMethod,
    )
    companyPaymentMethods: CompanyPaymentMethod[];

    @OneToMany(
        () => Order,
        orders => orders.paymentMethod,
    )
    orders: Order[];
}
