import { Inject, Injectable } from '@nestjs/common';
import { PageInfo } from '../../common/types/page-info';
import { PickUpAreaFilterDTO } from '../dtos/pickup-area.filter.dto';
import { PickUpArea } from '../entities/pickup-area.entity';
import { IPickUpAreaRepository } from '../interfaces/pickup-area.repository.interface';

@Injectable()
export class ListPickUpAreasService {
    constructor(
        @Inject('IPickUpAreaRepository')
        private deliveryAreaRepository: IPickUpAreaRepository,
    ) {}

    execute(filter: PickUpAreaFilterDTO, pagination: PageInfo): Promise<PickUpArea[]> {
        return this.deliveryAreaRepository.getList(filter, pagination);
    }
}
