import { IRepositoryBase } from 'src/modules/common/interfaces/repository.base.interface';
import { GeoPoint } from 'src/modules/common/types/geo-point';
import { PageInfo } from 'src/modules/common/types/page-info';
import { SelectQueryBuilder } from 'typeorm';
import { CompanyFilterDTO } from '../dtos/company.filter.dto';
import { Company } from '../entities/company.entity';

export interface ICompanyRepository
    extends Omit<IRepositoryBase<Company, CompanyFilterDTO>, 'getList' | 'getCount' | 'get'> {
    getList(
        filter?: CompanyFilterDTO,
        pagination?: PageInfo,
        userLocation?: GeoPoint,
    ): Promise<Company[]>;

    get(companyId: number, userLocation?: GeoPoint): Promise<Company>;
    get(companyId: number[], userLocation?: GeoPoint): Promise<Company[]>;

    getCount(filter?: CompanyFilterDTO, userLocation?: GeoPoint): Promise<number>;

    applyBaseSelection(query: SelectQueryBuilder<Company>): SelectQueryBuilder<Company>;

    applyUserLocationSelection(
        query: SelectQueryBuilder<Company>,
        location?: GeoPoint,
    ): SelectQueryBuilder<Company>;

    applyAreasSelection(
        query: SelectQueryBuilder<Company>,
        location: GeoPoint,
    ): SelectQueryBuilder<Company>;

    mapProperties(companies: Company[], raw: any[]): Company[];
}
