import { Coupon } from '../entities/coupon.entity';

export interface ICreateCouponEvent {
    coupon: Coupon;
}
