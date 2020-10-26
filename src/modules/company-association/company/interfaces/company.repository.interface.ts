import { IRepositoryBase } from '../../../common/interfaces/repository.base.interface';
import { GeoPoint } from '../../../common/types/geo-point';
import { SelectQueryBuilder } from 'typeorm';
import { CompanyFilterDTO } from '../dtos/company.filter.dto';
import { Company } from '../entities/company.entity';
import { ICompanyRepositoryListOptions } from './company-options.repository.interface';
import { ICompanyFiltersOptions } from './company-filters-options.interface';
import { Category } from 'src/modules/category/entities/category.entity';

export interface ICompanyRepository
    extends Omit<IRepositoryBase<Company, CompanyFilterDTO>, 'getList' | 'getCount' | 'get'> {
    addCategory(companyId: Company['id'], categoryId: Category['id']): Promise<any>;
    removeCategory(companyId: Company['id'], categoryId: Category['id']): Promise<any>;

    getList(options?: ICompanyRepositoryListOptions): Promise<Company[]>;

    getCount(options: ICompanyFiltersOptions): Promise<number>;

    get(companyId: number, userLocation?: GeoPoint): Promise<Company>;
    get(companyId: number[], userLocation?: GeoPoint): Promise<Company[]>;

    applyBaseSelection(query: SelectQueryBuilder<Company>): SelectQueryBuilder<Company>;

    applyUserLocationSelection(query: SelectQueryBuilder<Company>, location?: GeoPoint): SelectQueryBuilder<Company>;

    applyAreasSelection(query: SelectQueryBuilder<Company>, location: GeoPoint): SelectQueryBuilder<Company>;

    mapProperties(companies: Company[], raw: any[]): Company[];
}
