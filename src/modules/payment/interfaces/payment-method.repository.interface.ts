import { IRepositoryBase } from '../../common/interfaces/repository.base.interface';
import { PaymentMethodFilterDTO } from '../dtos/payment-method.filter.dto';
import { PaymentMethod } from '../entities/payment.method.entity';

export interface IPaymentMethodRepository
    extends IRepositoryBase<PaymentMethod, PaymentMethodFilterDTO> {}
