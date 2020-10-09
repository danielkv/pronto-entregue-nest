import { IRepositoryBase } from '../../common/interfaces/repository.base.interface';
import { GeoPoint } from '../../common/types/geo-point';
import { DeliveryFilterDTO } from '../../delivery/dtos/delivery.filter.dto';
import { DeliveryArea } from '../entities/delivery.area.entity';

export interface IDeliveryAreaRepository extends IRepositoryBase<DeliveryArea, DeliveryFilterDTO> {
    /**
     * Filter companies and locations
     */
    filterCompanyAndLocation(companyId: number, location: GeoPoint): Promise<DeliveryArea[]>;
    filterCompanyAndLocation(companyId: number[], location: GeoPoint[]): Promise<DeliveryArea[]>;
    filterCompanyAndLocation(companyId: any, location: any): Promise<DeliveryArea[]>;
}
