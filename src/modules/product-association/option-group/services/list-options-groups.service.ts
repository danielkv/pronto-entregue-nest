import { Inject, Injectable } from '@nestjs/common';
import { PageInfo } from 'src/modules/common/types/page-info';
import { OptionGroupFilterDTO } from '../dtos/option-group.filter.dto';
import { OptionGroup } from '../entities/option.group.entity';
import { OptionGroupActiveFilter } from '../filters/option-group.active.filter';
import { OptionGroupIdFilter } from '../filters/option-group.id.filter';
import { OptionGroupProductFilter } from '../filters/option-group.product.filter';
import { OptionGroupRemovedFilter } from '../filters/option-group.removed.filter';
import { OptionGroupSearchFilter } from '../filters/option-group.search.filter';
import { IOptionGroupRepository } from '../interface/option-grou.repository.interface';
import { IOptionGroupListOptions } from '../interface/option-group-list-options.interface';

@Injectable()
export class ListOptionGroupService {
    constructor(
        @Inject('IOptionGroupRepository') private optionGroupRepository: IOptionGroupRepository,
        private optionGroupActiveFilter: OptionGroupActiveFilter,
        private optionGroupIdFilter: OptionGroupIdFilter,
        private optionGroupProductFilter: OptionGroupProductFilter,
        private optionGroupRemovedFilter: OptionGroupRemovedFilter,
        private optionGroupSearchFilter: OptionGroupSearchFilter,
    ) {}

    execute(filter?: OptionGroupFilterDTO, pagination?: PageInfo): Promise<OptionGroup[]> {
        const options: IOptionGroupListOptions = {
            pagination,
            filter,
            filterHelpers: [
                this.optionGroupActiveFilter,
                this.optionGroupIdFilter,
                this.optionGroupProductFilter,
                this.optionGroupRemovedFilter,
                this.optionGroupSearchFilter,
            ],
        };

        return this.optionGroupRepository.getList(options);
    }
}
