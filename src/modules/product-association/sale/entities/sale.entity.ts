import { Field, Float, ID, ObjectType } from '@nestjs/graphql';
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

@ObjectType()
@Index('productId', ['productId'], {})
@Entity('sales')
export class Sale {
    @Field(() => ID)
    @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
    id: number;

    @Field(() => Float)
    @Column('decimal', { name: 'price', precision: 10, scale: 2 })
    price: number;

    @Field()
    @Column('datetime', { name: 'startsAt', nullable: true })
    startsAt: Date | null;

    @Field()
    @Column('datetime', { name: 'expiresAt', nullable: true })
    expiresAt: Date | null;

    @Field()
    @Column({ type: 'boolean', name: 'active', default: true })
    active: boolean;

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
