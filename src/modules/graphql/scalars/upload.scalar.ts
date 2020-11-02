import { CustomScalar, Scalar } from '@nestjs/graphql';

import { GraphQLUpload, FileUpload } from 'graphql-upload';

@Scalar('Upload')
export class Upload implements CustomScalar<string, FileUpload> {
    name = 'Upload';
    description = 'GraphQLUpload.description';

    serialize = GraphQLUpload.serialize;
    parseValue = GraphQLUpload.parseValue;
    parseLiteral = GraphQLUpload.parseLiteral;
}
