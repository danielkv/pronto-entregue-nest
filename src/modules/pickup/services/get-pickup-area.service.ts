import { Inject, Injectable } from '@nestjs/common';
import { GeoPoint } from '../../common/types/geo-point';
import { PickUpArea } from '../entities/pickup-area.entity';
import { IPickUpAreaRepository } from '../interfaces/pickup-area.repository.interface';

@Injectable()
export class GetPickUpAreaService {
    constructor(
        @Inject('IPickUpAreaRepository')
        private pickUpAreaRepository: IPickUpAreaRepository,
    ) {}

    execute(companyId: number, location: GeoPoint): Promise<PickUpArea[]>;
    execute(companyId: number[], location: GeoPoint[]): Promise<PickUpArea[]>;
    execute(companyId: any, location: any): Promise<PickUpArea[]> {
        return this.pickUpAreaRepository.filterCompanyAndLocation(companyId, location);
    }
}
