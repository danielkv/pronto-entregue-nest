import { GeoPoint } from 'src/modules/common/types/geo-point';

export interface IEntityAddress {
    [key: string]: string | GeoPoint | number;
}
