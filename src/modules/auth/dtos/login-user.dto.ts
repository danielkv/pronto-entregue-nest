import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType('LoginUser')
export class LoginUserDTO {
    @Field()
    accessToken: string;
}
