import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { ProductTypeEnum } from '../enums/product-type.enum';
import { IsBoolean, IsInt, IsNumber, IsOptional, IsString } from 'class-validator';
import { OptionGroupDTO } from '../../option-group/dtos/option.group.dto';
import { FileUpload } from 'graphql-upload';
import { Upload } from 'src/modules/graphql/scalars/upload.scalar';
import { FilterableField, FilterableRelation } from '@nestjs-query/query-graphql';

@ObjectType('Product')
@FilterableRelation('optionsGroups', () => OptionGroupDTO)
export class ProductDTO {
    @IsOptional()
    @IsInt()
    @FilterableField(() => Int)
    id?: number;

    @IsString()
    @FilterableField()
    name: string;

    @IsString()
    @FilterableField()
    description: string;

    @IsString()
    @FilterableField()
    sku: string;

    @IsString()
    @Field()
    image: string;

    @IsOptional()
    @Field(() => Upload)
    file?: FileUpload;

    @IsBoolean()
    @FilterableField()
    active: boolean;

    /* @IsBoolean()
    @Field()
    listed: boolean; */

    @IsInt()
    @FilterableField({ allowedComparisons: [] })
    order: number;

    @IsString()
    @Field(() => ProductTypeEnum)
    type: ProductTypeEnum;

    @IsNumber()
    @Field(() => Float)
    fromPrice: number;

    @IsNumber()
    @FilterableField(() => Float)
    price: number;

    @IsInt()
    @FilterableField(() => Int)
    categoryId: number;

    @IsInt()
    @FilterableField(() => Int)
    companyId: number;

    @IsInt()
    @Field(() => Int, { nullable: true })
    minDeliveryTime?: number;

    @IsBoolean()
    @Field()
    scheduleEnabled: boolean;
}
