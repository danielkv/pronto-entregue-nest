import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import {
    Column,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Company } from '../company/entities/company.entity';
import { Order } from '../order/order.entity';
import { User } from '../user/user.entity';

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
    @Column('datetime', { name: 'createdAt' })
    createdAt: Date;

    @Field()
    @Column('datetime', { name: 'updatedAt' })
    updatedAt: Date;

    @Field(() => Int)
    @Column('int', { name: 'companyId', nullable: true })
    companyId: number | null;

    @Field(() => Int)
    @Column('int', { name: 'orderId', nullable: true })
    orderId: number | null;

    @Field(() => Int)
    @Column('int', { name: 'userId', nullable: true })
    userId: number | null;

    @Field()
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

    @Field()
    @ManyToOne(
        () => Order,
        orders => orders.ratings,
        {
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
        },
    )
    @JoinColumn([{ name: 'orderId', referencedColumnName: 'id' }])
    order: Order;

    @Field()
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
