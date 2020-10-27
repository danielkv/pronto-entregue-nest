import { Company } from '../entities/company.entity';

export interface IUpdateCompanyEvent {
    company: Company;
}
