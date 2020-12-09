import { Company } from 'src/modules/company-association/company/entities/company.entity';
import { User } from 'src/modules/user-association/user/entities/user.entity';
import { AppRoles } from '../enums/app-roles.enum';

export interface AuthenticatedCompany {
    companyId: Company['id'];
    userId: User['id'];
    permissions: AppRoles[];
}
