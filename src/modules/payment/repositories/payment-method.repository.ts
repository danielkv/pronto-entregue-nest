import { RepositoryBase } from '../../common/repositories/repository.base';
import { EntityRepository } from 'typeorm';
import { PaymentMethod } from '../entities/payment.method.entity';

@EntityRepository(PaymentMethod)
export class PaymentMethodRepository extends RepositoryBase<PaymentMethod> {}
