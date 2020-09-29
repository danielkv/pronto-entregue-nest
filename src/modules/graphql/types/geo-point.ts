import { IGeoPoint } from '../../../common/interfaces/IGeoPoint';

export class GeoPoint implements IGeoPoint {
    type: string;
    coordinates: number[];
}
