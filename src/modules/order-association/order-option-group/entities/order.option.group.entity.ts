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
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { OrderOptionGroupPriceType } from '../enums/order-option-group-price-type.enum';
import { OptionGroup } from 'src/modules/product-association/option-group/entities/option.group.entity';

@ObjectType()
@Index('orderProductId', ['orderProductId'], {})
@Index('optionsGroupRelatedId', ['optionsGroupRelatedId'], {})
@Entity('order_option_groups')
export class OrderOptionGroup {
    @Field(() => ID)
    @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
    id: number;

    @Field()
    @Column('varchar', { name: 'name', nullable: true, length: 255 })
    name: string | null;

    @Field(() => OrderOptionGroupPriceType)
    @Column('enum', {
        name: 'priceType',
        enum: OrderOptionGroupPriceType,
        default: OrderOptionGroupPriceType.HIGHER,
    })
    priceType: OrderOptionGroupPriceType;

    @Field()
    @CreateDateColumn({ name: 'createdAt' })
    createdAt: Date;

    @Field()
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
    )
    orderOptions: OrderOption[];
}
