import { User } from 'src/modules/user-association/user/entities/user.entity';
import { Column, Entity, Index, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('delivery_men')
export class DeliveryMan {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('int')
    @Index({ unique: true })
    userId: User['id'];

    @OneToOne(
        () => User,
        user => user.deliveryMan,
    )
    @JoinColumn({ referencedColumnName: 'id', name: 'userId' })
    user: User;
}
