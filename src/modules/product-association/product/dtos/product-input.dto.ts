import { Field, Float, InputType, Int } from '@nestjs/graphql';
import { ProductTypeEnum } from '../enums/product-type.enum';
import { FileUpload, GraphQLUpload } from 'graphql-upload';
import { OptionGroupInputDTO } from '../../option-group/dtos/option-group-input.dto';

@InputType('ProductInput')
export class ProductInputDTO {
    @Field(() => Int, { nullable: true })
    id?: number;

    @Field()
    name: string;

    @Field()
    description: string;

    @Field()
    sku: string;

    @Field(() => GraphQLUpload, { nullable: true })
    file?: FileUpload;

    @Field()
    active: boolean;

    @Field()
    order: number;

    @Field(() => ProductTypeEnum)
    type: ProductTypeEnum;

    @Field(() => Float)
    fromPrice: number;

    @Field(() => Float)
    price: number;

    @Field(() => Int)
    categoryId: number;

    @Field(() => Int)
    companyId: number;

    @Field(() => Int, { nullable: true })
    minDeliveryTime?: number;

    @Field()
    scheduleEnabled: boolean;

    @Field(() => [OptionGroupInputDTO])
    optionsGroups: OptionGroupInputDTO[];
}
