import { Inject, Injectable } from '@nestjs/common';
import { OptionGroup } from '../../option-group/entities/option.group.entity';
import { OptionDTO } from '../dtos/option.dto';
import { Option } from '../entities/option.entity';
import { IOptionRepository } from '../interfaces/option.repository.interface';

@Injectable()
export class SaveOptionsService {
    constructor(@Inject('IOptionRepository') private optionRepository: IOptionRepository) {}

    async execute(optionGroupId: OptionGroup['id'], options: OptionDTO[]): Promise<Option[]> {
        // create instances
        const optionsInstances = this.optionRepository.create(options.map(option => ({ ...option, optionGroupId })));

        // save
        const saved = await this.optionRepository.save(optionsInstances);

        // return
        return saved;
    }
}
