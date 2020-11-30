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
import { OrderOptionGroup } from '../../order-option-group/entities/order.option.group.entity';
import { Option } from '../../../product-association/option/entities/option.entity';

@Index('orderOptionsGroupId', ['orderOptionsGroupId'], {})
@Index('optionRelatedId', ['optionRelatedId'], {})
@Entity('order_options')
export class OrderOption {
    @PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
    id: number;

    @Column('varchar', { name: 'name', nullable: true, length: 255 })
    name: string | null;

    @Column('varchar', { name: 'description', nullable: true, length: 255 })
    description: string | null;

    @Column('decimal', {
        name: 'price',
        nullable: true,
        precision: 10,
        scale: 2,
    })
    price: number | null;

    @CreateDateColumn({ name: 'createdAt' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updatedAt' })
    updatedAt: Date;

    @Column('int', { name: 'orderOptionsGroupId', nullable: true })
    orderOptionsGroupId: number | null;

    @Column('int', { name: 'optionRelatedId', nullable: true })
    optionRelatedId: number | null;

    @ManyToOne(
        () => OrderOptionGroup,
        orderOptionGroups => orderOptionGroups.orderOptions,
        { onDelete: 'CASCADE', onUpdate: 'CASCADE' },
    )
    @JoinColumn([{ name: 'orderOptionsGroupId', referencedColumnName: 'id' }])
    orderOptionsGroup: OrderOptionGroup;

    @ManyToOne(
        () => Option,
        options => options.orderOptions,
        {
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
        },
    )
    @JoinColumn([{ name: 'optionRelatedId', referencedColumnName: 'id' }])
    optionRelated: Option;
}
