import { Field, Float, ID, InputType, Int } from '@nestjs/graphql';
import { Company } from '../../company-association/company/entities/company.entity';
import { Product } from '../../product-association/product/entities/product.entity';
import { User } from '../../user-association/user/entities/user.entity';
import { CouponValueType } from '../enums/coupon-valye-type.enum';

@InputType('CouponInput')
export class CouponDTO {
    @Field(() => ID)
    id: number;

    @Field()
    name: string;

    @Field()
    image: string;

    @Field()
    startsAt: Date;

    @Field()
    expiresAt: Date;

    @Field()
    description: string;

    @Field()
    masterOnly: boolean;

    @Field()
    onlyFirstPurchases: boolean;

    @Field()
    featured: boolean;

    @Field()
    active: boolean;

    @Field(() => Float)
    taxable: number;

    @Field(() => Int)
    maxPerUser: number;

    @Field(() => Int)
    maxPurchases: number;

    @Field(() => Float)
    minValue: number;

    @Field(() => Float)
    maxValue: number;

    @Field(() => CouponValueType)
    valueType: CouponValueType;

    @Field(() => Float)
    value: number;

    @Field()
    freeDelivery: boolean;

    @Field()
    createdAt: Date;

    @Field()
    updatedAt: Date;

    @Field(() => [Int])
    companies: Company['id'][];

    @Field(() => [Int])
    products: Product['id'][];

    @Field(() => [Int])
    users: User['id'][];
}
