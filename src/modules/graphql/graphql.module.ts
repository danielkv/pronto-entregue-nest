import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { resolve } from 'path';
import { DateScalar } from '../graphql/scalars/date-scalar';
import { GeoPointScalar } from '../graphql/scalars/geo-point-scalar';

@Module({
    imports: [
        GraphQLModule.forRoot({
            buildSchemaOptions: {
                dateScalarMode: 'timestamp',
            },
            context: ({ req }) => ({ req }),
            autoSchemaFile: resolve(__dirname, 'schema.gql'),
            uploads: {
                maxFileSize: 20000000, // 20 MB
                maxFiles: 5,
            },
        }),
    ],
    providers: [GeoPointScalar, DateScalar],
})
export class GraphqlModule {}
