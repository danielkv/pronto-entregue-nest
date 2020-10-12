import { GeoPoint } from 'src/modules/common/types/geo-point';
import { PageInfo } from 'src/modules/common/types/page-info';
import { OrderByCondition } from 'typeorm';
import { CompanyFilterDTO } from '../dtos/company.filter.dto';

export interface ICompanyRepositoryGetList {
    filter?: CompanyFilterDTO;
    pagination?: PageInfo;
    userLocation?: GeoPoint;
}
