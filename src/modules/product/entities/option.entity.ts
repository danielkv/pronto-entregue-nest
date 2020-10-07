import {
    Column,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { OptionGroup } from './option.group.entity';
import { OrderOption } from '../../order/order.option.entity';
import { Field, Float, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Index('optionsGroupId', ['optionsGroupId'], {})
@Entity('options')
export class Option {
    @Field(() => ID)
    @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
    id: number;

    @Field()
    @Column('varchar', { name: 'name', nullable: true, length: 255 })
    name: string | null;

    @Field()
    @Column('varchar', { name: 'description', nullable: true, length: 255 })
    description: string | null;

    @Field(() => Int)
    @Column('int', { name: 'order', default: 0 })
    order: number;

    @Field(() => Int)
    @Column('int', { name: 'maxSelectRestrainOther', nullable: true })
    maxSelectRestrainOther: number | null;

    @Field()
    @Column({
        type: 'boolean',
        name: 'active',
        nullable: true,
        default: true,
    })
    active: boolean | null;

    @Field()
    @Column({ type: 'boolean', name: 'removed', default: false })
    removed: boolean;

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

    @Column('int', { name: 'optionsGroupId', nullable: true })
    optionsGroupId: number | null;

    @Field(() => OptionGroup)
    @ManyToOne(
        () => OptionGroup,
        optionsGroups => optionsGroups.options,
        {
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
        },
    )
    @JoinColumn([{ name: 'optionsGroupId', referencedColumnName: 'id' }])
    optionsGroup: OptionGroup;

    @Field(() => [OrderOption])
    @OneToMany(
        () => OrderOption,
        orderOptions => orderOptions.optionRelated,
    )
    orderOptions: OrderOption[];
}
