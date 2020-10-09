import { Inject, Injectable } from '@nestjs/common';
import { PickUpAreaFilterDTO } from '../dtos/pickup-area.filter.dto';
import { IPickUpAreaRepository } from '../interfaces/pickup-area.repository.interface';

@Injectable()
export class CountPickUpAreasService {
    constructor(
        @Inject('IPickUpAreaRepository')
        private pickUpAreaRepository: IPickUpAreaRepository,
    ) {}

    execute(filter?: PickUpAreaFilterDTO): Promise<number> {
        return this.pickUpAreaRepository.getCount(filter);
    }
}
