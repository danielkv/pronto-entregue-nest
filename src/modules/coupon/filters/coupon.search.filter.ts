import { Injectable } from '@nestjs/common';
import { IFilter } from '../../common/interfaces/IFilter';
import { Brackets } from 'typeorm';
import { QueryBuilderBase } from '../../common/repositories/query.builder.base';
import { Coupon } from '../entities/coupon.entity';
import { CouponFilterDTO } from '../dto/coupon.filter.dto';

@Injectable()
export class CouponSearchFilter implements IFilter<Coupon, CouponFilterDTO> {
    apply(
        query: QueryBuilderBase<Coupon, CouponFilterDTO>,
        filter?: any,
    ): QueryBuilderBase<Coupon, CouponFilterDTO> {
        if (!filter?.search) return query;

        return query
            .andWhere(
                new Brackets(qb =>
                    qb
                        .where('coupon.name LIKE :search')
                        .orWhere('coupon.description LIKE :search'),
                ),
            )
            .setParameters({
                search: `%${filter.search}%`,
            });
    }
}
