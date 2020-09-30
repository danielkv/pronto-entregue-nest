import { Field, InputType } from '@nestjs/graphql';

@InputType('ConpanyFilterInput')
export class CompanyFilter {
    @Field()
    search: string;
}
