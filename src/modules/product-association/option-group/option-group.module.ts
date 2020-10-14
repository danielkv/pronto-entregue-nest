import { Module } from '@nestjs/common';
import { OptionGroupFilterDTO } from './dtos/option-group.filter.dto';
import { OptionGroupActiveFilter } from './filters/option-group.active.filter';
import { OptionGroupIdFilter } from './filters/option-group.id.filter';
import { OptionGroupProductFilter } from './filters/option-group.product.filter';
import { OptionGroupRemovedFilter } from './filters/option-group.removed.filter';
import { OptionGroupSearchFilter } from './filters/option-group.search.filter';
import { GetOptionGroupService } from './services/get-options-groups.service';
import { OptionGroupRepositoryProvider } from './repositories/option-group.repository';
import { ListOptionGroupService } from './services/list-options-groups.service';

@Module({
    imports: [OptionGroupFilterDTO],
    providers: [
        // filters
        OptionGroupActiveFilter,
        OptionGroupIdFilter,
        OptionGroupProductFilter,
        OptionGroupRemovedFilter,
        OptionGroupSearchFilter,

        // services
        GetOptionGroupService,
        ListOptionGroupService,

        // repositories
        OptionGroupRepositoryProvider,
    ],
    exports: [ListOptionGroupService],
})
export class OptionGroupModule {}
