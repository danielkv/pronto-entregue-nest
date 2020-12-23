import { FilterableField, Relation } from '@nestjs-query/query-graphql';
import { Field, Float, ID, ObjectType } from '@nestjs/graphql';
import { ProductDTO } from '../../product/dtos/product.dto';

@ObjectType('Sale')
@Relation('product', () => ProductDTO, { allowFiltering: true })
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
