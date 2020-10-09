import { Module } from '@nestjs/common';
import { CompanyMetaModule } from './company-meta/company-meta.module';
import { CompanySectionModule } from './company-section/company-section.module';
import { CompanyModule } from './company/company.module';

@Module({
    imports: [CompanyModule, CompanyMetaModule, CompanySectionModule],
})
export class CompanyAssociationModule {}
