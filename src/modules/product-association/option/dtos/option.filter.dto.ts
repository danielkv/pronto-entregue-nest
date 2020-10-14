import { Field, ID, InputType } from '@nestjs/graphql';

@InputType('OptionFilterInput')
export class OptionFilterDTO {
    @Field({ nullable: true })
    search?: string;

    @Field({ nullable: true })
    includeRemoved?: boolean;

    @Field(() => [ID], { nullable: true })
    optionsGroupId?: number | number[];

    @Field(() => [ID], { nullable: true })
    optionId?: number | number[];

    @Field({ nullable: true })
    onlyActive?: boolean;
}
