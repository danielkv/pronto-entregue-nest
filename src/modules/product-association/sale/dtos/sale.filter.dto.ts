import { Field, ID, InputType } from '@nestjs/graphql';

@InputType('SaleFilterInput')
export class SaleFilterDTO {
    @Field({ nullable: true })
    search?: string;

    @Field(() => [ID], { nullable: true })
    saleId?: number | number[];

    @Field(() => [ID], { nullable: true })
    userId?: number | number[];

    @Field(() => [ID], { nullable: true })
    companyId?: number | number[];

    @Field(() => [ID], { nullable: true })
    productId?: number | number[];

    @Field({ nullable: true })
    onlyActive?: boolean;

    @Field({ nullable: true })
    includeExpired?: boolean;
}
