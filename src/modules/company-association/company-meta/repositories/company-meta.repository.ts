import { RepositoryBase } from '../../../common/repositories/repository.base';
import { EntityRepository } from 'typeorm';
import { ICompanyMetaRepository } from '../interfaces/company-meta.repository.interface';
import { CompanyMeta } from '../entities/company.meta.entity';
import { CompanyConfigDTO, ICompanyConfigKeys } from '../dtos/company.config.dto';
import { ConfigTransformHelper } from 'src/modules/common/helpers/config.transform.helper';
import { RepositoryProviderFactory } from 'src/modules/common/helpers/repository-provider.factory';

@EntityRepository(CompanyMeta)
export class CompanyMetaRepository extends RepositoryBase<CompanyMeta>
    implements ICompanyMetaRepository {
    constructor(private configTransformHelper: ConfigTransformHelper<CompanyConfigDTO>) {
        super();

        this.setQueryBuilderTableName('meta');
    }

    async getMany(companyId: number, keys: ICompanyConfigKeys[]): Promise<CompanyMeta[]>;
    async getMany(companyId: number[], keys: ICompanyConfigKeys[]): Promise<CompanyMeta[]>;
    async getMany(companyId: any, keys: ICompanyConfigKeys[]): Promise<CompanyMeta[]> {
        // check companyId type
        const companyIds = !Array.isArray(companyId) ? [companyId] : companyId;

        // build query
        const query = this.createQueryBuilder('meta');

        // add filters
        query
            .where('meta.key IN (:...keys)')
            .andWhere('meta.companyId IN (:...companyIds)')
            .setParameters({ keys, companyIds });

        // return values
        return query.getMany();
    }

    async getOne(
        companyId: number,
        key: ICompanyConfigKeys,
    ): Promise<CompanyConfigDTO[ICompanyConfigKeys]> {
        const query = this.createQueryBuilder('meta');

        // add filter
        query
            .where('meta.key = :key', { key })
            .andWhere('meta.companyId = :companyId', { companyId });

        const meta = await query.getOne();

        const transformed = this.configTransformHelper.apply([meta], CompanyConfigDTO);

        return transformed[key];
    }
}

export const CompanyMetaRepositoryProvider = new RepositoryProviderFactory(
    'ICompanyMetaRepository',
    CompanyMetaRepository,
).create();
