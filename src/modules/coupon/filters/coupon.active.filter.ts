import { Injectable } from '@nestjs/common';
import { IFilter } from '../../common/interfaces/IFilter';
import { QueryBuilderBase } from '../../common/repositories/query.builder.base';
import { CouponFilterDTO } from '../dto/coupon.filter.dto';
import { Coupon } from '../entities/coupon.entity';

@Injectable()
export class CouponActiveFilter implements IFilter<Coupon, CouponFilterDTO> {
    apply(
        query: QueryBuilderBase<Coupon, CouponFilterDTO>,
        filter?: CouponFilterDTO,
    ): QueryBuilderBase<Coupon, CouponFilterDTO> {
        if (filter?.onlyActive === false) return query;

        return query.andWhere('coupon.active');
    }
}
