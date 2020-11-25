import { Module } from '@nestjs/common';
import { OptionGroupFilterDTO } from './dtos/option-group.filter.dto';
import { OptionGroupRepositoryProvider } from './repositories/option-group.repository';
import { OptionModule } from '../option/option.module';

@Module({
    imports: [OptionGroupFilterDTO, OptionModule],
    providers: [
        // repositories
        OptionGroupRepositoryProvider,
    ],
})
export class OptionGroupModule {}
