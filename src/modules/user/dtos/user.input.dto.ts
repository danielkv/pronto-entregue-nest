import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UserInputDTO {
    @Field()
    firstName: string | null;

    @Field({ nullable: true })
    lastName: string | null;

    @Field({ nullable: true })
    image: string | null;

    @Field()
    email: string | null;

    @Field()
    password: string | null;

    @Field()
    active: boolean | null;

    @Field()
    role: string;

    @Field()
    metas: UserMeta[];
}
