import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType('LoginUser')
export class LoginUserDTO {
    @Field()
    userAccessToken: string;
}
