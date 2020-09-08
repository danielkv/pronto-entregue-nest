import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Coupon } from "./coupon.entity";
import { Company } from "../company/entities/company.entity";

@Index("companyId", ["companyId"], {})
@Entity("coupon_companies")
export class CouponCompany {
	@Column("datetime", { name: "createdAt" })
	createdAt: Date;

	@Column("datetime", { name: "updatedAt" })
	updatedAt: Date;

	@Column("int", { primary: true, name: "couponId" })
	couponId: number;

	@Column("int", { primary: true, name: "companyId" })
	companyId: number;

	@ManyToOne(() => Coupon, (coupon) => coupon.couponCompanies, {
		onDelete: "CASCADE",
		onUpdate: "CASCADE",
	})
	@JoinColumn([{ name: "couponId", referencedColumnName: "id" }])
	coupon: Coupon;

	@ManyToOne(() => Company, (company) => company.couponCompanies, {
		onDelete: "CASCADE",
		onUpdate: "CASCADE",
	})
	@JoinColumn([{ name: "companyId", referencedColumnName: "id" }])
	company: Company;
}
