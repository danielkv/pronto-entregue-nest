import { RepositoryBase } from '../../common/repositories/repository.base';
import { Connection, EntityRepository } from 'typeorm';
import { FactoryProvider } from '@nestjs/common';
import { ICompanyMetaRepository } from '../interfaces/company-meta.repository.interface';
import { CompanyMeta } from '../entities/company.meta.entity';

@EntityRepository(CompanyMeta)
export class CompanyMetaRepository extends RepositoryBase<CompanyMeta>
    implements ICompanyMetaRepository {
    constructor() {
        super();

        this.setQueryBuilderTableName('meta');
    }
}

export const CompanyMetaRepositoryProvider: FactoryProvider<CompanyMetaRepository> = {
    provide: 'ICompanyMetaRepository',
    useFactory: (connection: Connection) => connection.getCustomRepository(CompanyMetaRepository),
    inject: [Connection],
};
