import { RepositoryBase } from "src/modules/common/repositories/repository.base";
import { EntityRepository } from "typeorm";
import { CouponFilterDTO } from "../dto/coupon.filter.dto";
import { Coupon } from "../entities/coupon.entity";
import { ICouponRepository } from "../interfaces/coupon.repository.interface";

@EntityRepository(Coupon)
export class CouponRepository extends RepositoryBase<Coupon, CouponFilterDTO> implements ICouponRepository {
	constructor() {
		super()
		
		this.setQueryBuilderTableName('coupon')
	}
}