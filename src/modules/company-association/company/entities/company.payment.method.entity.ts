import {
    Column,
    CreateDateColumn,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Company } from './company.entity';
import { PaymentMethod } from '../../../payment/entities/payment.method.entity';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Index(
    'company_payment_methods_paymentMethodId_companyId_unique',
    ['companyId', 'paymentMethodId'],
    { unique: true },
)
@Index('paymentMethodId', ['paymentMethodId'], {})
@Entity('company_payment_methods')
export class CompanyPaymentMethod {
    @Field(() => ID)
    @PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
    id: number;

    @Field()
    @Column('text', { name: 'settings', nullable: true })
    settings: string | null;

    @Field()
    @CreateDateColumn({ name: 'createdAt' })
    createdAt: Date;

    @Field()
    @UpdateDateColumn({ name: 'updatedAt' })
    updatedAt: Date;

    @Column('int', { name: 'companyId', nullable: true })
    companyId: number | null;

    @Column('int', { name: 'paymentMethodId', nullable: true })
    paymentMethodId: number | null;

    @Field(() => Company)
    @ManyToOne(
        () => Company,
        companies => companies.companyPaymentMethods,
        {
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        },
    )
    @JoinColumn([{ name: 'companyId', referencedColumnName: 'id' }])
    company: Company;

    @Field(() => PaymentMethod)
    @ManyToOne(
        () => PaymentMethod,
        paymentMethods => paymentMethods.companyPaymentMethods,
        { onDelete: 'CASCADE', onUpdate: 'CASCADE' },
    )
    @JoinColumn([{ name: 'paymentMethodId', referencedColumnName: 'id' }])
    paymentMethod: PaymentMethod;
}
