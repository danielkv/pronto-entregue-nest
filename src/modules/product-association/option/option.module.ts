import { Module } from '@nestjs/common';
import { OptionFilterDTO } from './dtos/option.filter.dto';

import { OptionRepositoryProvider } from './repositories/option.repository';

@Module({
    imports: [OptionFilterDTO],
    providers: [
        // repositories
        OptionRepositoryProvider,
    ],
})
export class OptionModule {}
