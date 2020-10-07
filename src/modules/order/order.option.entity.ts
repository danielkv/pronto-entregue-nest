import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { OrderOptionGroup } from './order.option.group.entity';
import { Option } from '../product/entities/option.entity';
import { Field, Float, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Index('orderOptionsGroupId', ['orderOptionsGroupId'], {})
@Index('optionRelatedId', ['optionRelatedId'], {})
@Entity('order_options')
export class OrderOption {
    @Field(() => ID)
    @PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
    id: number;

    @Field()
    @Column('varchar', { name: 'name', nullable: true, length: 255 })
    name: string | null;

    @Field()
    @Column('varchar', { name: 'description', nullable: true, length: 255 })
    description: string | null;

    @Field(() => Float)
    @Column('decimal', {
        name: 'price',
        nullable: true,
        precision: 10,
        scale: 2,
    })
    price: number | null;

    @Field()
    @Column('datetime', { name: 'createdAt' })
    createdAt: Date;

    @Field()
    @Column('datetime', { name: 'updatedAt' })
    updatedAt: Date;

    @Column('int', { name: 'orderOptionsGroupId', nullable: true })
    orderOptionsGroupId: number | null;

    @Column('int', { name: 'optionRelatedId', nullable: true })
    optionRelatedId: number | null;

    @Field(() => OrderOptionGroup)
    @ManyToOne(
        () => OrderOptionGroup,
        orderOptionGroups => orderOptionGroups.orderOptions,
        { onDelete: 'CASCADE', onUpdate: 'CASCADE' },
    )
    @JoinColumn([{ name: 'orderOptionsGroupId', referencedColumnName: 'id' }])
    orderOptionsGroup: OrderOptionGroup;

    @Field(() => Option)
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
