import { Inject, Injectable } from '@nestjs/common';
import { OptionGroup } from '../../option-group/entities/option.group.entity';
import { Product } from '../../product/entities/product.entity';
import { OptionGroupDTO } from '../dtos/option.group.dto';
import { IOptionGroupRepository } from '../interfaces/option-grou.repository.interface';

@Injectable()
export class SaveOptionsGroupsService {
    constructor(@Inject('IOptionGroupRepository') private optionGroupRepository: IOptionGroupRepository) {}

    async execute(productId: Product['id'], optionsGroups: OptionGroupDTO[]): Promise<OptionGroup[]> {
        // create instances
        const optionsGroupsInstances = this.optionGroupRepository.create(
            optionsGroups.map(group => ({ ...group, productId })),
        );

        // save
        const saved = await this.optionGroupRepository.save(optionsGroupsInstances);

        // return
        return saved;
    }
}
