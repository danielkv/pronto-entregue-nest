import { PaymentMethod } from 'src/modules/payment/entities/payment.method.entity';
import { IRepositoryBase } from '../../../common/interfaces/repository.base.interface';
import { Company } from '../../company/entities/company.entity';
import { CompanyPaymentMethod } from '../entities/company.payment.method.entity';

export interface ICompanyPaymentMethodRepository extends IRepositoryBase<CompanyPaymentMethod> {
    unassignPaymentMethod(companyId: Company['id'], paymentMethodId: PaymentMethod['id']): Promise<any>;
}
