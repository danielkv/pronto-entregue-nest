import {
    Column,
    CreateDateColumn,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { OrderProduct } from '../../order-product/entities/order.product.entity';
import { OrderOption } from '../../order-option/entities/order.option.entity';
import { OrderOptionGroupPriceType } from '../enums/order-option-group-price-type.enum';
import { OptionGroup } from 'src/modules/product-association/option-group/entities/option.group.entity';

@Index('orderProductId', ['orderProductId'], {})
@Index('optionsGroupRelatedId', ['optionsGroupRelatedId'], {})
@Entity('order_option_groups')
export class OrderOptionGroup {
    @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
    id: number;

    @Column('varchar', { name: 'name', nullable: true, length: 255 })
    name: string | null;

    @Column('enum', {
        name: 'priceType',
        enum: OrderOptionGroupPriceType,
        default: OrderOptionGroupPriceType.HIGHER,
    })
    priceType: OrderOptionGroupPriceType;

    @CreateDateColumn({ name: 'createdAt' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updatedAt' })
    updatedAt: Date;

    @Column('int', { name: 'orderProductId', nullable: true, unsigned: true })
    orderProductId: number | null;

    @Column('int', { name: 'optionsGroupRelatedId', nullable: true })
    optionsGroupRelatedId: number | null;

    @ManyToOne(
        () => OrderProduct,
        orderProducts => orderProducts.orderOptionGroups,
        { onDelete: 'CASCADE', onUpdate: 'CASCADE' },
    )
    @JoinColumn([{ name: 'orderProductId', referencedColumnName: 'id' }])
    orderProduct: OrderProduct;

    @ManyToOne(
        () => OptionGroup,
        optionsGroups => optionsGroups.orderOptionGroups,
        { onDelete: 'SET NULL', onUpdate: 'CASCADE' },
    )
    @JoinColumn([{ name: 'optionsGroupRelatedId', referencedColumnName: 'id' }])
    optionsGroupRelated: OptionGroup;

    @OneToMany(
        () => OrderOption,
        orderOptions => orderOptions.orderOptionsGroup,
        { cascade: true },
    )
    orderOptions: OrderOption[];
}
