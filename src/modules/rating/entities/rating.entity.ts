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
import { User } from '../../user-association/user/entities/user.entity';

@Index('companyId', ['companyId'], {})
@Index('orderId', ['orderId'], {})
@Index('userId', ['userId'], {})
@Entity('ratings')
export class Rating {
    @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
    id: number;

    @Column('int', { name: 'rate', nullable: true })
    rate: number | null;

    @Column('text', { name: 'comment', nullable: true })
    comment: string | null;

    @Column({
        type: 'boolean',
        name: 'hidden',
        nullable: true,
        default: true,
    })
    hidden: boolean | null;

    @CreateDateColumn({ name: 'createdAt' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updatedAt' })
    updatedAt: Date;

    @Column('int', { name: 'companyId', nullable: true })
    companyId: number | null;

    @Column('int', { name: 'orderId', nullable: true })
    orderId: number | null;

    @Column('int', { name: 'userId', nullable: true })
    userId: number | null;

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
