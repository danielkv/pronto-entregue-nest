import { Field, InputType } from '@nestjs/graphql';
import { FilterableRelation } from '@nestjs-query/query-graphql';
import { UserMetaDTO } from '../../user-meta/dtos/user.meta.dto';
import { FileUpload, GraphQLUpload } from 'graphql-upload';

@InputType('UsereInput')
@FilterableRelation('metas', () => [UserMetaDTO])
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
