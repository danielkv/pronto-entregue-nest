import { Field, InputType } from '@nestjs/graphql';

@InputType('UserMetaInput')
export class UserMetaInputDTO {
    @Field({ nullable: true })
    key?: string;

    @Field({ nullable: true })
    value?: string;

    @Field({ nullable: true, defaultValue: null })
    userId?: number;
}
