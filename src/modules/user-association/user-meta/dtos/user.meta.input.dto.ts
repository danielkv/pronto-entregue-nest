import { Field, ID, InputType } from '@nestjs/graphql';
import { UserMeta } from '../entities/user.meta.entity';

@InputType('UserMetaInput')
export class UserMetaInputDTO {
    @Field(() => ID, { nullable: true })
    id?: UserMeta['id'];

    @Field({ nullable: true })
    key?: string;

    @Field({ nullable: true })
    value?: string;

    @Field({ nullable: true, defaultValue: null })
    userId?: number;
}
