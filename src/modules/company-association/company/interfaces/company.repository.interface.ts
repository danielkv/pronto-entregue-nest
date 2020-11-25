import { IRepositoryBase } from '../../../common/interfaces/repository.base.interface';
import { GeoPoint } from '../../../common/types/geo-point';
import { SelectQueryBuilder } from 'typeorm';
import { Company } from '../entities/company.entity';
import { Category } from 'src/modules/category/entities/category.entity';

export interface ICompanyRepository extends IRepositoryBase<Company> {
    addCategory(companyId: Company['id'], categoryId: Category['id']): Promise<any>;
    removeCategory(companyId: Company['id'], categoryId: Category['id']): Promise<any>;

    applyBaseSelection(query: SelectQueryBuilder<Company>): SelectQueryBuilder<Company>;

    applyUserLocationSelection(query: SelectQueryBuilder<Company>, location?: GeoPoint): SelectQueryBuilder<Company>;

    applyAreasSelection(query: SelectQueryBuilder<Company>, location: GeoPoint): SelectQueryBuilder<Company>;

    mapProperties(companies: Company[], raw: any[]): Company[];
}
