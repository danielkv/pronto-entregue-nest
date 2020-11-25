import { Field, InputType } from '@nestjs/graphql';

@InputType('CompanyExtraFilter')
export class CompanyExtraFilterDTO {
    @Field({ nullable: true })
    location?: boolean;
}
