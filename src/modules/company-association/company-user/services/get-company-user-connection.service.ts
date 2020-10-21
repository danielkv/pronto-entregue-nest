import { Inject, Injectable } from '@nestjs/common';
import { User } from 'src/modules/user-association/user/entities/user.entity';
import { Company } from '../../company/entities/company.entity';
import { CompanyUser } from '../entities/company.user.entity';
import { CompanyUserRepository } from '../repositories/company-user.repository';

@Injectable()
export class GetCompanyUserConnectionService {
    constructor(@Inject('ICompanyUserRepository') private companyUserRepository: CompanyUserRepository) {}

    execute(companyId: Company['id'], userId: User['id']): Promise<CompanyUser> {
        return this.companyUserRepository.findConnection(companyId, userId);
    }
}
