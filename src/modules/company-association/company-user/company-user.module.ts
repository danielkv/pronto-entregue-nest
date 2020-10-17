import { Module } from '@nestjs/common';
import { CompanyUserFilterDTO } from './dtos/company-user.filter.dto';
import { CompanyUserRepositoryProvider } from './repositories/company-user.repository';
import { GetCompanyUserConnectionService } from './services/get-company-user-connection.service';

@Module({
    imports: [CompanyUserFilterDTO],
    providers: [
        // services
        GetCompanyUserConnectionService,

        // repositories
        CompanyUserRepositoryProvider,
    ],
    exports: [GetCompanyUserConnectionService],
})
export class CompanyUserModule {}
