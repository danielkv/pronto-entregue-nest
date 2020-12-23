import { Product } from 'src/modules/product-association/product/entities/product.entity';
import {
    Column,
    CreateDateColumn,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

@Index('productId', ['productId'], {})
@Entity('sales')
export class Sale {
    @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
    id: number;

    @Column('decimal', { name: 'price', precision: 10, scale: 2 })
    price: number;

    @Column('datetime', { name: 'startsAt', nullable: true })
    startsAt: Date | null;

    @Column('datetime', { name: 'expiresAt', nullable: true })
    expiresAt: Date | null;

    @Column({ type: 'boolean', name: 'active', default: true })
    active: boolean;

    @Column({ type: 'boolean', name: 'removed', default: false })
    removed: boolean;

    @CreateDateColumn({ name: 'createdAt' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updatedAt' })
    updatedAt: Date;

    @Column('int', { name: 'productId', nullable: true })
    productId: number | null;

    @ManyToOne(
        () => Product,
        products => products.sales,
        {
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
        },
    )
    @JoinColumn([{ name: 'productId', referencedColumnName: 'id' }])
    product: Product;
}
