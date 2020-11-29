import { RepositoryBase } from '../../../common/repositories/repository.base';
import { EntityRepository } from 'typeorm';
import { CompanyUser } from '../entities/company.user.entity';

@EntityRepository(CompanyUser)
export class CompanyUserRepository extends RepositoryBase<CompanyUser> {}
