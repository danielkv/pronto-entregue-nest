import { Module } from '@nestjs/common';
import { CompanySectionLoader } from './loaders/company-section.loader';
import { CompanySectionRepositoryProvider } from './repositories/company-section.repository';
import { CompanySectionResolver } from './resolvers/company-section.resolver';
import { ListCompanySectionsService } from './services/list-company-sections.service';

@Module({
    providers: [
        // services
        ListCompanySectionsService,

        // loaders
        CompanySectionLoader,

        // resolvers
        CompanySectionResolver,

        // repositories
        CompanySectionRepositoryProvider,
    ],
})
export class CompanySectionModule {}
