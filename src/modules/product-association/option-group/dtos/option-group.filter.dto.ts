import { Field, ID, InputType } from '@nestjs/graphql';

@InputType('OptionGroupFilterInput')
export class OptionGroupFilterDTO {
    @Field({ nullable: true })
    search?: string;

    @Field(() => [ID], { nullable: true })
    productId?: number | number[];

    @Field(() => [ID], { nullable: true })
    optionGroupId?: number | number[];

    @Field({ nullable: true })
    onlyActive?: boolean;

    @Field({ nullable: true })
    includeRemoved?: boolean;
}
