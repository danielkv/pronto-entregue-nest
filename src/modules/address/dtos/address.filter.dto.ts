import { Field, ID, InputType } from '@nestjs/graphql';

@InputType('AddressFilterInput')
export class AddressFilterDTO {
    @Field(() => [ID], { nullable: true })
    userId?: number | number[];
}
