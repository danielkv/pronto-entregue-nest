import { RepositoryBase } from '../../../common/repositories/repository.base';
import { EntityRepository } from 'typeorm';
import { RepositoryProviderFactory } from '../../../common/helpers/repository-provider.factory';
import { CompanyPaymentMethod } from '../entities/company.payment.method.entity';
import { ICompanyPaymentMethodRepository } from '../interfaces/company-payment-method-repository.interface';

@EntityRepository(CompanyPaymentMethod)
export class CompanyPaymentMethodRepository extends RepositoryBase<CompanyPaymentMethod>
    implements ICompanyPaymentMethodRepository {
    constructor() {
        super();

        this.setQueryBuilderTableName('companyPaymentMethod');
    }
}

export const CompanyPaymentMethodRepositoryProvider = new RepositoryProviderFactory(
    'ICompanyPaymentMethodRepository',
    CompanyPaymentMethodRepository,
).create();
