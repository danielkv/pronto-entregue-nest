import {
    Column,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../user/user.entity';
import { Order } from '../order/order.entity';
import { Field, Float, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Index('userId', ['userId'], {})
@Entity('credit_history')
export class CreditHistory {
    @Field(() => ID)
    @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
    id: number;

    @Field(() => Float)
    @Column('float', { name: 'value', nullable: true, precision: 12 })
    value: number | null;

    @Field()
    @Column('varchar', { name: 'history', nullable: true, length: 255 })
    history: string | null;

    @Field()
    @Column('datetime', { name: 'createdAt' })
    createdAt: Date;

    @Field()
    @Column('datetime', { name: 'updatedAt' })
    updatedAt: Date;

    @Column('int', { name: 'userId', nullable: true })
    userId: number | null;

    @Field(() => User)
    @ManyToOne(
        () => User,
        users => users.creditHistories,
        {
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
        },
    )
    @JoinColumn([{ name: 'userId', referencedColumnName: 'id' }])
    user: User;

    @Field(() => [Order], { nullable: true })
    @OneToMany(
        () => Order,
        orders => orders.creditHistory,
    )
    orders: Order[];
}
