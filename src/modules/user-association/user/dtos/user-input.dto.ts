import { Field, InputType } from '@nestjs/graphql';
import { FileUpload, GraphQLUpload } from 'graphql-upload';

@InputType('UserInput')
export class UserInputDTO {
    @Field()
    firstName: string;

    @Field()
    lastName: string;

    @Field(() => GraphQLUpload)
    file: FileUpload;

    @Field()
    email: string;

    @Field()
    password: string;
}
