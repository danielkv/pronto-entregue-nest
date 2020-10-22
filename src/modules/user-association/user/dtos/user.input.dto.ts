import { Field, InputType } from '@nestjs/graphql';
import { UserMetaInputDTO } from '../../user-meta/dtos/user.meta.input.dto';

@InputType('UserInput')
export class UserInputDTO {
    @Field({ nullable: true })
    firstName?: string;

    @Field({ nullable: true })
    lastName?: string;

    @Field({ nullable: true })
    image?: string;

    @Field({ nullable: true })
    email?: string;

    @Field({ nullable: true })
    password?: string;

    @Field({ nullable: true })
    active?: boolean;

    @Field({ nullable: true })
    role?: string;

    @Field(() => [UserMetaInputDTO], { nullable: true })
    metas?: UserMetaInputDTO[];
}
