import { Module } from '@nestjs/common';
import { CouponFilterDTO } from './dto/coupon.filter.dto';
import { CouponActiveFilter } from './filters/coupon.active.filter';
import { CouponExpiredFilter } from './filters/coupon.expired.filter';
import { CouponSearchFilter } from './filters/coupon.search.filter';

@Module({
    imports: [CouponFilterDTO],
    providers: [
        // filters
        CouponActiveFilter,
        CouponExpiredFilter,
        CouponSearchFilter,
    ],
})
export class CouponModule {}
