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
import { OrderOptionGroup } from '../../order-option-group/entities/order.option.group.entity';
import { Product } from '../../../product-association/product/entities/product.entity';
import { Order } from '../../order/entities/order.entity';

@Index('orderId', ['orderId'], {})
@Index('productRelatedId', ['productRelatedId'], {})
@Entity('order_products')
export class OrderProduct {
    @PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
    id: number;

    @Column('int', { name: 'quantity', nullable: true })
    quantity: number | null;

    @Column('varchar', { name: 'name', nullable: true, length: 255 })
    name: string | null;

    @Column('decimal', {
        name: 'price',
        nullable: true,
        precision: 10,
        scale: 2,
    })
    price: number | null;

    @Column('varchar', { name: 'message', nullable: true, length: 255 })
    message: string | null;

    @CreateDateColumn({ name: 'createdAt' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updatedAt' })
    updatedAt: Date;

    @Column('int', { name: 'orderId', nullable: true })
    orderId: number | null;

    @Column('int', { name: 'productRelatedId', nullable: true })
    productRelatedId: number | null;

    @OneToMany(
        () => OrderOptionGroup,
        orderOptionGroups => orderOptionGroups.product,
        { cascade: true },
    )
    optionsGroups: OrderOptionGroup[];

    @ManyToOne(
        () => Order,
        orders => orders.products,
        {
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
        },
    )
    @JoinColumn([{ name: 'orderId', referencedColumnName: 'id' }])
    order: Order;

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
