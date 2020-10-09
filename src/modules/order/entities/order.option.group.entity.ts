import {
    Column,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderProduct } from './order.product.entity';
import { OptionGroup } from '../../product/entities/option.group.entity';
import { OrderOption } from './order.option.entity';
import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';

export enum OrderOptionGroupPriceType {
    HIGHER = 'higher',
    SUM = 'sum',
}

registerEnumType(OrderOptionGroupPriceType, {
    name: 'OrderOptionGroupPriceType',
});

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
    @Column('datetime', { name: 'createdAt' })
    createdAt: Date;

    @Field()
    @Column('datetime', { name: 'updatedAt' })
    updatedAt: Date;

    @Column('int', { name: 'orderProductId', nullable: true, unsigned: true })
    orderProductId: number | null;

    @Column('int', { name: 'optionsGroupRelatedId', nullable: true })
    optionsGroupRelatedId: number | null;

    @Field(() => OrderProduct)
    @ManyToOne(
        () => OrderProduct,
        orderProducts => orderProducts.orderOptionGroups,
        { onDelete: 'CASCADE', onUpdate: 'CASCADE' },
    )
    @JoinColumn([{ name: 'orderProductId', referencedColumnName: 'id' }])
    orderProduct: OrderProduct;

    @Field(() => OptionGroup)
    @ManyToOne(
        () => OptionGroup,
        optionsGroups => optionsGroups.orderOptionGroups,
        { onDelete: 'SET NULL', onUpdate: 'CASCADE' },
    )
    @JoinColumn([{ name: 'optionsGroupRelatedId', referencedColumnName: 'id' }])
    optionsGroupRelated: OptionGroup;

    @Field(() => [OrderOption])
    @OneToMany(
        () => OrderOption,
        orderOptions => orderOptions.orderOptionsGroup,
    )
    orderOptions: OrderOption[];
}
