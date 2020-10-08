import { Inject, Injectable } from '@nestjs/common';
import { DeliveryAreaFilterDTO } from '../dtos/delivery.area.filter.dto';
import { IDeliveryAreaRepository } from '../interfaces/delivery-area.repository.interface';

@Injectable()
export class CountDeliveryAreasService {
    constructor(
        @Inject('IDeliveryAreaRepository')
        private deliveryAreaRepository: IDeliveryAreaRepository,
    ) {}

    execute(filter?: DeliveryAreaFilterDTO): Promise<number> {
        return this.deliveryAreaRepository.getCount(filter);
    }
}
