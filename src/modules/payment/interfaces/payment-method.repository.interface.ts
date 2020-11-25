import { IRepositoryBase } from '../../common/interfaces/repository.base.interface';
import { PaymentMethod } from '../entities/payment.method.entity';

export interface IPaymentMethodRepository extends IRepositoryBase<PaymentMethod> {}
