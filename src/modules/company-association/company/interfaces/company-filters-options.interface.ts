import { IRepositoryFiltersOptions } from '../../../common/interfaces/IRepositoryFiltersOptions';
import { GeoPoint } from '../../../common/types/geo-point';
import { CompanyFilterDTO } from '../dtos/company.filter.dto';
import { Company } from '../entities/company.entity';

export interface ICompanyFiltersOptions extends IRepositoryFiltersOptions<Company, CompanyFilterDTO> {
    userLocation?: GeoPoint;
}
