import { Inject, Injectable } from '@nestjs/common';
import { GeoPoint } from '../../common/types/geo-point';
import { DeliveryArea } from '../entities/delivery.area.entity';
import { IDeliveryAreaRepository } from '../interfaces/delivery-area.repository.interface';

@Injectable()
export class GetDeliveryAreaService {
    constructor(
        @Inject('IDeliveryAreaRepository')
        private deliveryAreaRepository: IDeliveryAreaRepository,
    ) {}

    execute(companyId: number, location: GeoPoint): Promise<DeliveryArea[]>;
    execute(companyId: number[], location: GeoPoint[]): Promise<DeliveryArea[]>;
    execute(companyId: any, location: any): Promise<DeliveryArea[]> {
        return this.deliveryAreaRepository.filterCompanyAndLocation(companyId, location);
    }
}
