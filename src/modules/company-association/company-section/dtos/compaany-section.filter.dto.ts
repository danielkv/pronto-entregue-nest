import { Field, ID, InputType } from '@nestjs/graphql';

@InputType('CompanySectionFilterInput')
export class CompanySectionFilterDTO {
    @Field({ nullable: true })
    search?: string;

    @Field(() => [ID], { nullable: true })
    companyId?: number | number[];

    @Field({ nullable: true })
    onlyActive?: boolean;
}
