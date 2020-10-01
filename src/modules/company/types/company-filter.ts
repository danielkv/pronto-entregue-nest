import { Field, InputType } from '@nestjs/graphql';

@InputType('CompanyFilterInput')
export class CompanyFilter {
    @Field({ nullable: true })
    search?: string;

    @Field({ nullable: true })
    location?: boolean;
}
