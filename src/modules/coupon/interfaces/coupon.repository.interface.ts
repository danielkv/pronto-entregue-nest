import { IRepositoryBase } from '../../common/interfaces/repository.base.interface';
import { Coupon } from '../entities/coupon.entity';
import { CouponFilterDTO } from '../dto/coupon.filter.dto';

export interface ICouponRepository extends IRepositoryBase<Coupon, CouponFilterDTO> {}
