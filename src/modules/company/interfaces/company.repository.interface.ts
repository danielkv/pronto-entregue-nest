import { IRepositoryBase } from 'src/modules/common/interfaces/repository.base.interface';
import { GeoPoint } from 'src/modules/common/types/geo-point';
import { SelectQueryBuilder } from 'typeorm';
import { CompanyFilterDTO } from '../dtos/company.filter';
import { Company } from '../entities/company.entity';

export interface ICompanyRepository extends IRepositoryBase<Company, CompanyFilterDTO> {
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
