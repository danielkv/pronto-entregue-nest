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
        }),
    ],
    providers: [GeoPointScalar, DateScalar],
})
export class GraphqlModule {}
