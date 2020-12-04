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
import { Option } from '../../option/entities/option.entity';
import { Product } from '../../product/entities/product.entity';
import { OrderOptionGroup } from '../../../order-association/order-option-group/entities/order.option.group.entity';
import { OptionGroupTypeEnum } from '../enums/option-group-type.enum';
import { OptionGroupPriceTypeEnum } from '../enums/option-group-price-type.enum';

@Index('productId', ['productId'], {})
@Index('maxSelectRestrain', ['maxSelectRestrain'], {})
@Entity('options_groups')
export class OptionGroup {
    @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
    id: number;

    @Column('varchar', { name: 'name', nullable: true, length: 255 })
    name: string | null;

    @Column('enum', {
        name: 'type',
        enum: OptionGroupTypeEnum,
        default: OptionGroupTypeEnum.SINGLE,
    })
    type: OptionGroupTypeEnum;

    @Column('enum', {
        name: 'priceType',
        enum: OptionGroupPriceTypeEnum,
        default: OptionGroupPriceTypeEnum.HIGHER,
    })
    priceType: OptionGroupPriceTypeEnum;

    @Column('int', { name: 'order', default: 0 })
    order: number;

    @Column('int', { name: 'minSelect', nullable: true })
    minSelect: number | null;

    @Column('int', { name: 'maxSelect', nullable: true })
    maxSelect: number | null;

    @Column({
        type: 'boolean',
        name: 'active',
        nullable: true,
        default: true,
    })
    active: boolean | null;

    @Column({ type: 'boolean', name: 'removed', default: false })
    removed: boolean;

    @CreateDateColumn({ name: 'createdAt' })
    createdAt: Date;

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
        orderOptionGroups => orderOptionGroups.optionGroupRelated,
    )
    orderOptionsGroups: OrderOptionGroup[];
}
