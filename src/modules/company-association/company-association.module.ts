import { Module } from '@nestjs/common';
import { CompanyMetaModule } from './company-meta/company-meta.module';
import { CompanySectionModule } from './company-section/company-section.module';
import { CompanyModule } from './company/company.module';
import { CompanyUserModule } from './company-user/company-user.module';
import { CompanyPaymentMethodModule } from './company-payment-method/company-payment-method.module';
import { BusinessHourModule } from './business-hour/business-hour.module';

@Module({
    imports: [CompanyModule, CompanyMetaModule, CompanySectionModule, CompanyUserModule, CompanyPaymentMethodModule, BusinessHourModule],
})
export class CompanyAssociationModule {}
