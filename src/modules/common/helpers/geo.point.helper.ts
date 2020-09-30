import { Injectable } from '@nestjs/common';
import { IGeoPoint } from '../interfaces/IGeoPoint';

@Injectable()
export class GeoPointHelper {
    /**
     * Converts GeoPoint to string
     * @param geoPoint Object GeoPoint
     */
    geoPointToText(geoPoint: IGeoPoint): string {
        const type = geoPoint.type.toUpperCase();

        return `${type}(${geoPoint.coordinates[0]} ${geoPoint.coordinates[1]})`;
    }

    /**
     * Converts string to GeoPoint
     * @param geoPointString
     */
    textToGeoPoint(geoPointString: string): IGeoPoint {
        const geoPointRegExp = /(\S+)\((.+)\s(.+)\)/;

        const test = geoPointString.match(geoPointRegExp);
        if (!test) throw new Error('Localização inválida');

        let type = test[1].toLowerCase();
        type = type.charAt(0).toUpperCase() + type.slice(1);

        return {
            type,
            coordinates: [Number(test[2]), Number(test[3])],
        };
    }
}
