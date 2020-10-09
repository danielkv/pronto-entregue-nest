import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import {
    Column,
    CreateDateColumn,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Company } from '../../company-association/company/entities/company.entity';
import { Order } from '../../order-association/order/entities/order.entity';
import { User } from '../../user/entities/user.entity';

@ObjectType()
@Index('companyId', ['companyId'], {})
@Index('orderId', ['orderId'], {})
@Index('userId', ['userId'], {})
@Entity('ratings')
export class Rating {
    @Field(() => ID)
    @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
    id: number;

    @Field(() => Int)
    @Column('int', { name: 'rate', nullable: true })
    rate: number | null;

    @Field()
    @Column('text', { name: 'comment', nullable: true })
    comment: string | null;

    @Field()
    @Column({
        type: 'boolean',
        name: 'hidden',
        nullable: true,
        default: true,
    })
    hidden: boolean | null;

    @Field()
    @CreateDateColumn({ name: 'createdAt' })
    createdAt: Date;

    @Field()
    @UpdateDateColumn({ name: 'updatedAt' })
    updatedAt: Date;

    @Column('int', { name: 'companyId', nullable: true })
    companyId: number | null;

    @Column('int', { name: 'orderId', nullable: true })
    orderId: number | null;

    @Column('int', { name: 'userId', nullable: true })
    userId: number | null;

    @Field(() => Company)
    @ManyToOne(
        () => Company,
        companies => companies.ratings,
        {
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
        },
    )
    @JoinColumn([{ name: 'companyId', referencedColumnName: 'id' }])
    company: Company;

    @Field(() => Order)
    @OneToOne(
        () => Order,
        orders => orders.rating,
        {
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
        },
    )
    @JoinColumn([{ name: 'orderId', referencedColumnName: 'id' }])
    order: Order;

    @Field(() => User)
    @ManyToOne(
        () => User,
        users => users.ratings,
        {
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
        },
    )
    @JoinColumn([{ name: 'userId', referencedColumnName: 'id' }])
    user: User;
}
