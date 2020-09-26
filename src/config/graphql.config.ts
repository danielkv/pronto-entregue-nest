import { GqlModuleOptions } from '@nestjs/graphql';

export const graphqlConfig: GqlModuleOptions = {
    buildSchemaOptions: {
        dateScalarMode: 'timestamp',
    },
};
