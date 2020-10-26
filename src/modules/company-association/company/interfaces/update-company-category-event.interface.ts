import { Category } from '../../../category/entities/category.entity';
import { Company } from '../../../company-association/company/entities/company.entity';

export interface IUpdateCompanyCategoryEvent {
    company: Company;
    category: Category;
}
