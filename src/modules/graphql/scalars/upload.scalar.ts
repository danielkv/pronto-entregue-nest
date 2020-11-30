import { CustomScalar, Scalar } from '@nestjs/graphql';

import { GraphQLUpload, FileUpload } from 'graphql-upload';

@Scalar('Upload')
export class Upload implements CustomScalar<string, FileUpload> {
    name = 'Upload';
    description = 'GraphQLUpload.description';

    parseValue(value) {
        return GraphQLUpload.parseValue(value);
    }

    serialize(value: any) {
        return GraphQLUpload.serialize(value);
    }

    parseLiteral(ast, variables) {
        return GraphQLUpload.parseLiteral(ast, variables);
    }
}
