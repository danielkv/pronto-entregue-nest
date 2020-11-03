import { Inject, Injectable } from '@nestjs/common';
import { PageInfo } from 'src/modules/common/types/page-info';
import { OptionFilterDTO } from '../dtos/option.filter.dto';
import { Option } from '../entities/option.entity';
import { OptionActiveFilter } from '../filters/option.active.filter';
import { OptionIdFilter } from '../filters/option.id.filter';
import { OptionOptionGroupFilter } from '../filters/option.optionGroup.filter';
import { OptionRemovedFilter } from '../filters/option.removed.filter';
import { OptionSearchFilter } from '../filters/option.search.filter';

import { IOptionListOptions } from '../interfaces/option-list-options.interface';
import { IOptionRepository } from '../interfaces/option.repository.interface';

@Injectable()
export class ListOptionService {
    constructor(
        @Inject('IOptionRepository') private optionRepository: IOptionRepository,
        private optionActiveFilter: OptionActiveFilter,
        private optionIdFilter: OptionIdFilter,
        private optionOptionGroupFilter: OptionOptionGroupFilter,
        private optionRemovedFilter: OptionRemovedFilter,
        private optionSearchFilter: OptionSearchFilter,
    ) {}

    execute(filter?: OptionFilterDTO, pagination?: PageInfo): Promise<Option[]> {
        const options: IOptionListOptions = {
            pagination,
            filter,
            filterHelpers: [
                this.optionActiveFilter,
                this.optionIdFilter,
                this.optionOptionGroupFilter,
                this.optionRemovedFilter,
                this.optionSearchFilter,
            ],
            orderBy: { 'option.order': 'ASC' },
        };

        return this.optionRepository.getList(options);
    }
}
