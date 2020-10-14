import { Module } from '@nestjs/common';
import { OptionFilterDTO } from './dtos/option.filter.dto';
import { OptionActiveFilter } from './filters/option.active.filter';
import { OptionIdFilter } from './filters/option.id.filter';
import { OptionOptionGroupFilter } from './filters/option.optionGroup.filter';
import { OptionRemovedFilter } from './filters/option.removed.filter';
import { OptionSearchFilter } from './filters/option.search.filter';
import { OptionRepositoryProvider } from './repositories/option.repository';
import { GetOptionService } from './services/get-option.service';

@Module({
    imports: [OptionFilterDTO],
    providers: [
        // filters
        OptionActiveFilter,
        OptionIdFilter,
        OptionOptionGroupFilter,
        OptionRemovedFilter,
        OptionSearchFilter,

        // services
        GetOptionService,

        // repositories
        OptionRepositoryProvider,
    ],
})
export class OptionModule {}
