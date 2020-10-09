import { Field, InputType } from '@nestjs/graphql';

@InputType('CompanySectionFilterInput')
export class CompanySectionFilterDTO {
    @Field({ nullable: true })
    search?: string;

    @Field({ nullable: true })
    onlyActive?: boolean;
}
