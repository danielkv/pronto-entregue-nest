import { Field, Float, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, Index, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../../user/entities/user.entity';

@ObjectType()
@Index('userId', ['userId'], {})
@Entity('credit_balances')
export class CreditBalance {
    @Field(() => ID)
    @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
    id: number;

    @Field(() => Float)
    @Column('float', { name: 'value', nullable: true, precision: 12 })
    value: number | null;

    @Field()
    @Column('datetime', { name: 'createdAt' })
    createdAt: Date;

    @Field()
    @Column('datetime', { name: 'updatedAt' })
    updatedAt: Date;

    @Column('int', { name: 'userId', nullable: true })
    userId: number | null;

    @Field(() => User)
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
