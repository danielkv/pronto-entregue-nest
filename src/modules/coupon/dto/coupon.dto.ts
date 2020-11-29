import { Field, Float, ID, Int, ObjectType } from '@nestjs/graphql';
import { IsArray, IsBoolean, IsDate, IsInt, IsNumber, IsString } from 'class-validator';
import { Company } from '../../company-association/company/entities/company.entity';
import { Product } from '../../product-association/product/entities/product.entity';
import { User } from '../../user-association/user/entities/user.entity';
import { CouponValueType } from '../enums/coupon-valye-type.enum';

@ObjectType('Coupon')
export class CouponDTO {
    @IsInt()
    @Field(() => ID, { nullable: true })
    id?: number;

    @IsString()
    @Field()
    name: string;

    @IsString()
    @Field()
    image: string;

    @IsDate()
    @Field()
    startsAt: Date;

    @IsDate()
    @Field()
    expiresAt: Date;

    @IsString()
    @Field()
    description: string;

    @IsBoolean()
    @Field()
    masterOnly: boolean;

    @IsBoolean()
    @Field()
    onlyFirstPurchases: boolean;

    @IsBoolean()
    @Field()
    featured: boolean;

    @IsBoolean()
    @Field()
    active: boolean;

    @IsNumber()
    @Field(() => Float)
    taxable: number;

    @IsInt()
    @Field(() => Int)
    maxPerUser: number;

    @IsInt()
    @Field(() => Int)
    maxPurchases: number;

    @IsNumber()
    @Field(() => Float)
    minValue: number;

    @IsNumber()
    @Field(() => Float)
    maxValue: number;

    @IsString()
    @Field(() => CouponValueType)
    valueType: CouponValueType;

    @IsNumber()
    @Field(() => Float)
    value: number;

    @IsBoolean()
    @Field()
    freeDelivery: boolean;

    @IsArray()
    @Field(() => [Int], { nullable: 'items' })
    companies: Company['id'][];

    @IsArray()
    @Field(() => [Int], { nullable: 'items' })
    products: Product['id'][];

    @IsArray()
    @Field(() => [Int], { nullable: 'items' })
    users: User['id'][];
}
