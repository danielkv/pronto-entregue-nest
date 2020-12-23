import { FilterableField, Relation } from '@nestjs-query/query-graphql';
import { Field, Float, ID, ObjectType } from '@nestjs/graphql';
import { Product } from '../../product/entities/product.entity';

@ObjectType('Sale')
@Relation('product', () => Product, { allowFiltering: true })
export class SaleDTO {
    @FilterableField(() => ID)
    id: number;

    @Field(() => Float)
    price: number;

    @FilterableField()
    startsAt: Date;

    @FilterableField()
    expiresAt: Date;

    @FilterableField()
    active: boolean;

    @FilterableField()
    removed: boolean;

    @FilterableField(() => ID)
    productId: number;
}
