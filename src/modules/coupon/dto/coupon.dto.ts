import { FilterableField, Relation } from '@nestjs-query/query-graphql';
import { Field, Float, ID, Int, ObjectType } from '@nestjs/graphql';
import { IsBoolean, IsDate, IsInt, IsNumber, IsString } from 'class-validator';
import { CompanyDTO } from 'src/modules/company-association/company/dtos/company.dto';
import { ProductDTO } from 'src/modules/product-association/product/dtos/product.dto';
import { UserDTO } from 'src/modules/user-association/user/dtos/user.dto';
import { CouponValueType } from '../enums/coupon-valye-type.enum';

@ObjectType('Coupon')
@Relation('companies', () => [CompanyDTO])
@Relation('users', () => [UserDTO])
@Relation('products', () => [ProductDTO])
export class CouponDTO {
    @IsInt()
    @Field(() => ID, { nullable: true })
    id?: number;

    @IsString()
    @FilterableField()
    name: string;

    @IsString()
    @Field()
    image: string;

    @IsDate()
    @FilterableField()
    startsAt: Date;

    @IsDate()
    @FilterableField()
    expiresAt: Date;

    @IsString()
    @FilterableField()
    description: string;

    @IsBoolean()
    @FilterableField()
    masterOnly: boolean;

    @IsBoolean()
    @FilterableField()
    onlyFirstPurchases: boolean;

    @IsBoolean()
    @FilterableField()
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
}
