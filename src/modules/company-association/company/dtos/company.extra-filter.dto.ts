import { Field, ID, InputType } from '@nestjs/graphql';

@InputType('CompanyExtraFilterInput')
export class CompanyExtraFilterDTO {
    @Field({ nullable: true })
    location?: boolean;
}
