import { Module } from '@nestjs/common';
import { CompanySectionRepositoryProvider } from './repositories/company-section.repository';
import { CompanySectionResolver } from './resolvers/company-section.resolver';
import { ListCompanySectionsService } from './services/list-company-sections.service';

@Module({
    providers: [
        // services
        ListCompanySectionsService,

        // resolvers
        CompanySectionResolver,

        // repositories
        CompanySectionRepositoryProvider,
    ],
})
export class CompanySectionModule {}
