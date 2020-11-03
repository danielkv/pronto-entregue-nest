import {
    Column,
    CreateDateColumn,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Option } from '../../option/entities/option.entity';
import { Product } from '../../product/entities/product.entity';
import { OrderOptionGroup } from '../../../order-association/order-option-group/entities/order.option.group.entity';
import { OptionGroupTypeEnum } from '../enums/option-group-type.enum';
import { OptionGroupPriceTypeEnum } from '../enums/option-group-price-type.enum';

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

    @Field(() => OptionGroupTypeEnum)
    @Column('enum', {
        name: 'type',
        enum: OptionGroupTypeEnum,
        default: OptionGroupTypeEnum.SINGLE,
    })
    type: OptionGroupTypeEnum;

    @Field(() => OptionGroupPriceTypeEnum)
    @Column('enum', {
        name: 'priceType',
        enum: OptionGroupPriceTypeEnum,
        default: OptionGroupPriceTypeEnum.HIGHER,
    })
    priceType: OptionGroupPriceTypeEnum;

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
    @CreateDateColumn({ name: 'createdAt' })
    createdAt: Date;

    @Field()
    @UpdateDateColumn({ name: 'updatedAt' })
    updatedAt: Date;

    @Column('int', { name: 'productId', nullable: true })
    productId: number | null;

    @Column('int', { name: 'maxSelectRestrain', nullable: true })
    maxSelectRestrain: number | null;

    @OneToMany(
        () => Option,
        options => options.optionsGroup,
        { cascade: true },
    )
    options: Option[];

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

    @OneToOne(
        () => OptionGroup,
        optionsGroup => optionsGroup.restrainedBy,
        { onDelete: 'SET NULL', onUpdate: 'CASCADE' },
    )
    @JoinColumn([{ name: 'maxSelectRestrain', referencedColumnName: 'id' }])
    groupRestrained: OptionGroup;

    @OneToOne(
        () => OptionGroup,
        optionsGroup => optionsGroup.groupRestrained,
    )
    restrainedBy: OptionGroup;

    @OneToMany(
        () => OrderOptionGroup,
        orderOptionGroups => orderOptionGroups.optionsGroupRelated,
    )
    orderOptionGroups: OrderOptionGroup[];
}
