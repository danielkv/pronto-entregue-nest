import { IRepositoryBase } from '../../common/interfaces/repository.base.interface';
import { GeoPoint } from '../../common/types/geo-point';
import { PickUpAreaFilterDTO } from '../dtos/pickup-area.filter.dto';
import { PickUpArea } from '../entities/pickup-area.entity';

export interface IPickUpAreaRepository extends IRepositoryBase<PickUpArea> {
    /**
     * Filter companies and locations
     */
    filterCompanyAndLocation(companyId: number, location: GeoPoint): Promise<PickUpArea[]>;
    filterCompanyAndLocation(companyId: number[], location: GeoPoint[]): Promise<PickUpArea[]>;
    filterCompanyAndLocation(companyId: any, location: any): Promise<PickUpArea[]>;
}
