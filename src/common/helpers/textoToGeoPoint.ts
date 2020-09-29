import { IGeoPoint } from '../interfaces/IGeoPoint';

export function textToGeoPoint(geoPointString: string): IGeoPoint {
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
