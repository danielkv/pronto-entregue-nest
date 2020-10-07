import { Field, Float, ID, ObjectType } from '@nestjs/graphql';
import {
    Column,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from './product.entity';

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
    @Column('datetime', { name: 'createdAt' })
    createdAt: Date;

    @Field()
    @Column('datetime', { name: 'updatedAt' })
    updatedAt: Date;

    @Column('int', { name: 'productId', nullable: true })
    productId: number | null;

    @Field(() => Product)
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
