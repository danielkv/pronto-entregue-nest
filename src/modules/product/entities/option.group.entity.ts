import {
    Column,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Option } from './option.entity';
import { Product } from './product.entity';
import { OrderOptionGroup } from '../../order/entities/order.option.group.entity';
import { Field, ID, Int, ObjectType, registerEnumType } from '@nestjs/graphql';

export enum OptionGroupType {
    SINGLE = 'single',
    MULTI = 'multi',
}

export enum OptionGroupPriceType {
    HIGHER = 'higher',
    SUM = 'sum',
}

registerEnumType(OptionGroupPriceType, { name: 'OptionGroupPriceType' });
registerEnumType(OptionGroupType, { name: 'OptionGroupType' });

@ObjectType()
@Index('productId', ['productId'], {})
@Index('maxSelectRestrain', ['maxSelectRestrain'], {})
@Entity('options_groups')
export class OptionGroup {
    @Field(() => ID)
    @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
    id: number;

    @Field()
    @Column('varchar', { name: 'name', nullable: true, length: 255 })
    name: string | null;

    @Field(() => OptionGroupType)
    @Column('enum', {
        name: 'type',
        enum: OptionGroupType,
        default: OptionGroupType.SINGLE,
    })
    type: OptionGroupType;

    @Field(() => OptionGroupPriceType)
    @Column('enum', {
        name: 'priceType',
        enum: OptionGroupPriceType,
        default: OptionGroupPriceType.HIGHER,
    })
    priceType: OptionGroupPriceType;

    @Field(() => Int)
    @Column('int', { name: 'order', default: 0 })
    order: number;

    @Field(() => Int)
    @Column('int', { name: 'minSelect', nullable: true })
    minSelect: number | null;

    @Field(() => Int)
    @Column('int', { name: 'maxSelect', nullable: true })
    maxSelect: number | null;

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

    @Field()
    @Column('datetime', { name: 'createdAt' })
    createdAt: Date;

    @Field()
    @Column('datetime', { name: 'updatedAt' })
    updatedAt: Date;

    @Column('int', { name: 'productId', nullable: true })
    productId: number | null;

    @Column('int', { name: 'maxSelectRestrain', nullable: true })
    maxSelectRestrain: number | null;

    @Field(() => [Option])
    @OneToMany(
        () => Option,
        options => options.optionsGroup,
    )
    options: Option[];

    @Field(() => Product)
    @ManyToOne(
        () => Product,
        products => products.optionsGroups,
        {
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
        },
    )
    @JoinColumn([{ name: 'productId', referencedColumnName: 'id' }])
    product: Product;

    @Field()
    @OneToOne(
        () => OptionGroup,
        optionsGroup => optionsGroup.restrainedBy,
        { onDelete: 'SET NULL', onUpdate: 'CASCADE' },
    )
    @JoinColumn([{ name: 'maxSelectRestrain', referencedColumnName: 'id' }])
    groupRestrained: OptionGroup;

    @Field()
    @OneToOne(
        () => OptionGroup,
        optionsGroup => optionsGroup.groupRestrained,
    )
    restrainedBy: OptionGroup;

    @Field(() => [OrderOptionGroup])
    @OneToMany(
        () => OrderOptionGroup,
        orderOptionGroups => orderOptionGroups.optionsGroupRelated,
    )
    orderOptionGroups: OrderOptionGroup[];
}
