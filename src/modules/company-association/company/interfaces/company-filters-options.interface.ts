import { IRepositoryFiltersOptions } from '../../../common/interfaces/IRepositoryFiltersOptions';
import { GeoPoint } from '../../../common/types/geo-point';
import { CompanyExtraFilterDTO } from '../dtos/company.extra-filter.dto';
import { Company } from '../entities/company.entity';

export interface ICompanyFiltersOptions extends IRepositoryFiltersOptions<Company, CompanyExtraFilterDTO> {
    userLocation?: GeoPoint;
}
