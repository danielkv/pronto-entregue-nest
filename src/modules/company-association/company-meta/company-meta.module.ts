import { Module } from '@nestjs/common';
import { CompanyConfigDTO } from './dtos/company.config.dto';
import { CompanyConfigLoader } from './loaders/company.config.loader';
import { CompanyMetaRepositoryProvider } from './repositories/company-meta.repository';
import { ConfigCompanyResolver } from './resolvers/company.resolver';
import { QueryCompanyMetaResolver } from './resolvers/query.company-meta.resolver';
import { GetCompanyConfigService } from './services/get-company-config.service';
import { GetCompanyMetaService } from './services/get.company.meta.service';
import { SaveCompanyMetasService } from './services/save-company-metas.service';

@Module({
    imports: [CompanyConfigDTO],
    providers: [
        // repositories
        CompanyMetaRepositoryProvider,
    ],
})
export class CompanyMetaModule {}
