import {
    Column,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderOptionGroup } from './order.option.group.entity';
import { Product } from '../product/product.entity';
import { Order } from './order.entity';
import { Field, Float, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Index('orderId', ['orderId'], {})
@Index('productRelatedId', ['productRelatedId'], {})
@Entity('order_products')
export class OrderProduct {
    @Field(() => ID)
    @PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
    id: number;

    @Field()
    @Column('int', { name: 'quantity', nullable: true })
    quantity: number | null;

    @Field()
    @Column('varchar', { name: 'name', nullable: true, length: 255 })
    name: string | null;

    @Field(() => Float)
    @Column('decimal', {
        name: 'price',
        nullable: true,
        precision: 10,
        scale: 2,
    })
    price: number | null;

    @Field()
    @Column('varchar', { name: 'message', nullable: true, length: 255 })
    message: string | null;

    @Field()
    @Column('datetime', { name: 'createdAt' })
    createdAt: Date;

    @Field()
    @Column('datetime', { name: 'updatedAt' })
    updatedAt: Date;

    @Column('int', { name: 'orderId', nullable: true })
    orderId: number | null;

    @Column('int', { name: 'productRelatedId', nullable: true })
    productRelatedId: number | null;

    @Field(() => OrderOptionGroup)
    @OneToMany(
        () => OrderOptionGroup,
        orderOptionGroups => orderOptionGroups.orderProduct,
    )
    orderOptionGroups: OrderOptionGroup[];

    @Field(() => Order)
    @ManyToOne(
        () => Order,
        orders => orders.orderProducts,
        {
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
        },
    )
    @JoinColumn([{ name: 'orderId', referencedColumnName: 'id' }])
    order: Order;

    @Field(() => Product)
    @ManyToOne(
        () => Product,
        products => products.orderProducts,
        {
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
        },
    )
    @JoinColumn([{ name: 'productRelatedId', referencedColumnName: 'id' }])
    productRelated: Product;
}
