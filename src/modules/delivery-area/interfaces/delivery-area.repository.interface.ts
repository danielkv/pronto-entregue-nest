import { IRepositoryBase } from 'src/modules/common/interfaces/repository.base.interface';
import { GeoPoint } from 'src/modules/common/types/geo-point';
import { DeliveryFilterDTO } from 'src/modules/delivery/dtos/delivery.filter.dto';
import { DeliveryArea } from '../entities/delivery.area.entity';

export interface IDeliveryAreaRepository extends IRepositoryBase<DeliveryArea, DeliveryFilterDTO> {
    /**
     * Filter companies and locations
     */
    filterCompanyAndLocation(companyId: number, location: GeoPoint): Promise<DeliveryArea[]>;
    filterCompanyAndLocation(companyId: number[], location: GeoPoint[]): Promise<DeliveryArea[]>;
    filterCompanyAndLocation(companyId: any, location: any): Promise<DeliveryArea[]>;
}
