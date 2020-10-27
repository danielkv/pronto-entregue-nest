import { Company } from '../entities/company.entity';

export interface ICreateCompanyEvent {
    company: Company;
}
