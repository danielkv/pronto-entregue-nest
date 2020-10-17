import { Company } from 'src/modules/company-association/company/entities/company.entity';
import { User } from 'src/modules/user/entities/user.entity';

export interface CompanyUserTokenPayload {
    companyId: Company['id'];
    userId: User['id'];
    permissions: string[];
}
