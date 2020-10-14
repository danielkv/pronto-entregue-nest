import { Inject, Injectable } from '@nestjs/common';
import { Option } from '../entities/option.entity';
import { IOptionRepository } from '../interfaces/option.repository.interface';

@Injectable()
export class GetOptionService {
    constructor(@Inject('IOptionRepository') private optionRepository: IOptionRepository) {}

    execute(optionId: Option['id']): Promise<Option>;
    execute(optionId: Option['id'][]): Promise<Option[]>;
    execute(optionId: any): Promise<Option | Option[]> {
        return this.optionRepository.get(optionId);
    }
}
