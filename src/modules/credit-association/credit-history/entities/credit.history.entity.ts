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
import { User } from '../../../user-association/user/entities/user.entity';
import { Order } from '../../../order-association/order/entities/order.entity';

@Index('userId', ['userId'], {})
@Entity('credit_history')
export class CreditHistory {
    @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
    id: number;

    @Column('float', { name: 'value', nullable: true, precision: 12 })
    value: number | null;

    @Column('varchar', { name: 'history', nullable: true, length: 255 })
    history: string | null;

    @CreateDateColumn({ name: 'createdAt' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updatedAt' })
    updatedAt: Date;

    @Column('int', { name: 'userId', nullable: true })
    userId: number | null;

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

    @OneToOne(
        () => Order,
        orders => orders.creditHistory,
    )
    order: Order;
}
