import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { resolve } from 'path';
import { DateScalar } from '../graphql/scalars/date-scalar';
import { GeoPointScalar } from '../graphql/scalars/geo-point-scalar';
import { PageInfo } from './types/page-info';

@Module({
    imports: [
        GraphQLModule.forRoot({
            buildSchemaOptions: {
                dateScalarMode: 'timestamp',
            },
            autoSchemaFile: resolve(__dirname, 'schema.gql'),
        }),
        PageInfo,
    ],
    providers: [GeoPointScalar, DateScalar],
})
export class GraphqlModule {}
