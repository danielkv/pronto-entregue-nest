import { Inject, Injectable } from '@nestjs/common';
import { PageInfo } from '../../common/types/page-info';
import { DeliveryArea } from '../entities/delivery.area.entity';
import { DeliveryAreaFilterDTO } from '../dtos/delivery.area.filter.dto';
import { IDeliveryAreaRepository } from '../interfaces/delivery-area.repository.interface';

@Injectable()
export class ListDeliveryAreasService {
    constructor(
        @Inject('IDeliveryAreaRepository')
        private deliveryAreaRepository: IDeliveryAreaRepository,
    ) {}

    execute(filter: DeliveryAreaFilterDTO, pagination: PageInfo): Promise<DeliveryArea[]> {
        return this.deliveryAreaRepository.getList({ filter, pagination });
    }
}
