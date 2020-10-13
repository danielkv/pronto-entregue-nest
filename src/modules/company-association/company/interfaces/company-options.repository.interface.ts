import { PageInfo } from '../../../common/types/page-info';
import { ICompanyFiltersOptions } from './company-filters-options.interface';

export interface ICompanyRepositoryListOptions extends ICompanyFiltersOptions {
    pagination?: PageInfo;
}
