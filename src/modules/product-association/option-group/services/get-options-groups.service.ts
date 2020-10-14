import { Inject, Injectable } from '@nestjs/common';
import { OptionGroup } from '../entities/option.group.entity';
import { IOptionGroupRepository } from '../interfaces/option-grou.repository.interface';

@Injectable()
export class GetOptionGroupService {
    constructor(@Inject('IOptionGroupRepository') private optionGroupRepository: IOptionGroupRepository) {}

    execute(optionGroupId: OptionGroup['id']): Promise<OptionGroup>;
    execute(optionGroupId: OptionGroup['id'][]): Promise<OptionGroup[]>;
    execute(optionGroupId: any): Promise<OptionGroup | OptionGroup[]> {
        return this.optionGroupRepository.get(optionGroupId);
    }
}
