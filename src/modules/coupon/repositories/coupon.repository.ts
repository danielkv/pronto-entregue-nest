import { RepositoryBase } from '../../common/repositories/repository.base';
import { EntityRepository } from 'typeorm';
import { Coupon } from '../entities/coupon.entity';

@EntityRepository(Coupon)
export class CouponRepository extends RepositoryBase<Coupon> {}
