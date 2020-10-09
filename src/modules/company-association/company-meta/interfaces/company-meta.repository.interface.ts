import { IRepositoryBase } from '../../../common/interfaces/repository.base.interface';
import { CompanyConfigDTO, ICompanyConfigKeys } from '../dtos/company.config.dto';
import { CompanyMeta } from '../entities/company.meta.entity';

export interface ICompanyMetaRepository extends IRepositoryBase<CompanyMeta> {
    getMany(companyId: number, keys: ICompanyConfigKeys[]): Promise<CompanyMeta[]>;
    getMany(companyId: number[], keys: ICompanyConfigKeys[]): Promise<CompanyMeta[]>;
    getOne(
        companyId: number,
        key: ICompanyConfigKeys,
    ): Promise<CompanyConfigDTO[ICompanyConfigKeys]>;
}
