import { Field, InputType } from '@nestjs/graphql';

@InputType('CompanyFilterInput')
export class CompanyFilterDTO {
    @Field({ nullable: true })
    search?: string;

    @Field({ nullable: true })
    location?: boolean;

    @Field({ nullable: true })
    onlyActive?: boolean;

    @Field({ nullable: true })
    onlyPublished?: boolean;
}
