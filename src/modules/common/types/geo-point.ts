import { IGeoPoint } from '../interfaces/IGeoPoint';

export class GeoPoint implements IGeoPoint {
    type: string;
    coordinates: number[];
}
