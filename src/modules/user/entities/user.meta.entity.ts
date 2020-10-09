import { Field, ID, ObjectType } from '@nestjs/graphql';
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
import { User } from './user.entity';

@ObjectType()
@Index('userId', ['userId'], {})
@Entity('user_metas')
export class UserMeta {
    @Field(() => ID)
    @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
    id: number;

    @Field()
    @Column('varchar', {
        name: 'key',
        nullable: true,
        comment: 'phone | email | document | address | ...',
        length: 255,
    })
    key: string | null;

    @Field()
    @Column('text', { name: 'value', nullable: true })
    value: string | null;

    @Field()
    @Column({
        type: 'boolean',
        name: 'unique',
        nullable: true,
        default: false,
    })
    unique: boolean | null;

    @Field()
    @CreateDateColumn({ name: 'createdAt' })
    createdAt: Date;

    @Field()
    @UpdateDateColumn({ name: 'updatedAt' })
    updatedAt: Date;

    @Column('int', { name: 'userId', nullable: true })
    userId: number | null;

    @Field(() => User)
    @ManyToOne(
        () => User,
        users => users.metas,
        {
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
        },
    )
    @JoinColumn([{ name: 'userId', referencedColumnName: 'id' }])
    user: User;
}
