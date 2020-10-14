import { Field, ID, InputType } from '@nestjs/graphql';

@InputType('ProductFilterInput')
export class ProductFilterDTO {
    @Field({ nullable: true })
    search?: string;

    @Field(() => [ID], { nullable: true })
    productId?: number | number[];

    @Field(() => [ID], { nullable: true })
    companyId?: number | number[];

    @Field(() => [ID], { nullable: true })
    categoryId?: number | number[];

    @Field({ nullable: true })
    onlyActive?: boolean;
}
