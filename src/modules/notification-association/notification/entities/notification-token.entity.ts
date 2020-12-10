import { User } from 'src/modules/user-association/user/entities/user.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { NotificationTokenTypeEnum } from '../enums/notification-token-type.enum';

@Entity('notification_tokens')
export class NotificationToken {
    @PrimaryGeneratedColumn({ type: 'int' })
    id: number;

    @Column({
        name: 'type',
        type: 'enum',
        enum: NotificationTokenTypeEnum,
        nullable: false,
    })
    type: NotificationTokenTypeEnum;

    @Column('varchar')
    value: string;

    @Column('int')
    userId: number;

    @ManyToOne(
        () => User,
        users => users.metas,
        {
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        },
    )
    @JoinColumn([{ name: 'userId', referencedColumnName: 'id' }])
    user: User;

    @CreateDateColumn()
    createdAt: Date;
}
