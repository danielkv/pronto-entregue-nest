import {
    Column,
    CreateDateColumn,
    Entity,
    Index,
    JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { User } from '../../../user-association/user/entities/user.entity';

@Index('userId', ['userId'], {})
@Entity('credit_balances')
export class CreditBalance {
    @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
    id: number;

    @Column('float', { name: 'value', nullable: true, precision: 12 })
    value: number | null;

    @CreateDateColumn({ name: 'createdAt' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updatedAt' })
    updatedAt: Date;

    @Column('int', { name: 'userId', nullable: true })
    userId: number | null;

    @OneToOne(
        () => User,
        users => users.creditBalance,
        {
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
        },
    )
    @JoinColumn([{ name: 'userId', referencedColumnName: 'id' }])
    user: User;
}
