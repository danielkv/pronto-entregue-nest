import _ from 'lodash';
import { Scalar, CustomScalar } from '@nestjs/graphql';
import { Kind } from 'graphql';

interface IPoint {
    type: string;
    coordinates: number[];
}

@Scalar('GeoPoint', () => [Number])
export class GeoPointScalar implements CustomScalar<number[], IPoint> {
    description = 'Date custom scalar type';

    parseValue(coordinates: number[]) {
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

    serialize(point: IPoint) {
        if (
            typeof point !== 'object' ||
            point.type !== 'Point' ||
            !Array.isArray(point.coordinates) ||
            !_.isNumber(point.coordinates[0]) ||
            !_.isNumber(point.coordinates[1])
        )
            throw new Error('GeoPoint inválido');

        return point.coordinates;
    }

    parseLiteral(ast) {
        if (ast.kind === Kind.LIST) {
            const coordinates = [
                parseFloat(ast.values[0].value),
                parseFloat(ast.values[1].value),
            ];
            return this.parseValue(coordinates);
        }
        return null;
    }
}
