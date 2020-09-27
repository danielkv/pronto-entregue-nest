import { IGeoPoint } from '../../../commom/interfaces/IGeoPoint';

export class GeoPoint implements IGeoPoint {
    type: string;
    coordinates: number[];
}
