import * as _ from 'lodash';
import { Scalar, CustomScalar } from '@nestjs/graphql';
import { Kind } from 'graphql';
import { IGeoPoint } from '../../../commom/interfaces/IGeoPoint';
import { GeoPoint } from 'src/commom/types/GeoPoint';

@Scalar('GeoPoint', () => GeoPoint)
export class GeoPointScalar implements CustomScalar<number[], IGeoPoint> {
    description = 'Date custom scalar type';

    parseValue(coordinates: number[]): IGeoPoint {
        if (
            !_.isArray(coordinates) ||
            !_.isNumber(coordinates[0]) ||
            !_.isNumber(coordinates[1])
        )
            throw new Error('GeoPoint inválido');

        return {
            type: 'Point',
            coordinates,
        };
    }

    serialize(point: IGeoPoint): number[] {
        if (
            typeof point !== 'object' ||
            point.type !== 'Point' ||
            !_.isArray(point.coordinates) ||
            !_.isNumber(point.coordinates[0]) ||
            !_.isNumber(point.coordinates[1])
        )
            throw new Error('GeoPoint inválido');

        return point.coordinates;
    }

    parseLiteral(ast): IGeoPoint {
        if (ast.kind !== Kind.LIST) throw new Error('GeoPoint Inválido');
        const coordinates = [
            Number(ast.values[0].value),
            Number(ast.values[1].value),
        ];

        return this.parseValue(coordinates);
    }
}
