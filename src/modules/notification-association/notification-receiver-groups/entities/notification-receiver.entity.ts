import { User } from 'src/modules/user-association/user/entities/user.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('notification_receivers')
export class NotificationReceiver {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: number;

    @Column('varchar')
    groupId: string;

    @Column({ default: false })
    removed: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @ManyToOne(() => User, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
    user: User;
}
