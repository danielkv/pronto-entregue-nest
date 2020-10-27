import { RepositoryBase } from '../../../common/repositories/repository.base';
import { EntityRepository } from 'typeorm';
import { RepositoryProviderFactory } from '../../../common/helpers/repository-provider.factory';
import { CompanyPaymentMethod } from '../entities/company.payment.method.entity';
import { ICompanyPaymentMethodRepository } from '../interfaces/company-payment-method-repository.interface';
import { Company } from '../../company/entities/company.entity';
import { PaymentMethod } from 'src/modules/payment/entities/payment.method.entity';

@EntityRepository(CompanyPaymentMethod)
export class CompanyPaymentMethodRepository extends RepositoryBase<CompanyPaymentMethod>
    implements ICompanyPaymentMethodRepository {
    constructor() {
        super();

        this.setQueryBuilderTableName('companyPaymentMethod');
    }

    unassignPaymentMethod(companyId: Company['id'], paymentMethodId: PaymentMethod['id']): Promise<any> {
        const query = this.createQueryBuilder(this.tablename)
            .delete()
            .where('companyId = :companyId')
            .andWhere('paymentMethodId = :paymentMethodId')
            .setParameters({ companyId, paymentMethodId });

        return query.execute();
    }
}

export const CompanyPaymentMethodRepositoryProvider = new RepositoryProviderFactory(
    'ICompanyPaymentMethodRepository',
    CompanyPaymentMethodRepository,
).create();
