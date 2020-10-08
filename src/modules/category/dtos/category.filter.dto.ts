import { Field, ID, InputType } from '@nestjs/graphql';

@InputType('CategoryFilterInput')
export class CategoryFilterDTO {
    @Field({ nullable: true })
    search?: string;

    @Field(() => [ID], { nullable: true })
    companyId?: number | number[];

    @Field(() => [ID], { nullable: true })
    categoryId?: number | number[];

    @Field({ nullable: true })
    onlyActive?: boolean;
}
