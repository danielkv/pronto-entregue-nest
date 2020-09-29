import { IGeoPoint } from '../interfaces/IGeoPoint';

export function geoPointToText(geoPoint: IGeoPoint): string {
    const type = geoPoint.type.toUpperCase();

    return `${type}(${geoPoint.coordinates[0]} ${geoPoint.coordinates[1]})`;
}
