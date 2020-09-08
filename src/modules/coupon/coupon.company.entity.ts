import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Coupons } from "./coupon.entity";
import { Companies } from "../company/company.entity";

@Index("companyId", ["companyId"], {})
@Entity("coupon_companies", { schema: "pronto_entregue" })
export class CouponCompanies {
	@Column("datetime", { name: "createdAt" })
	createdAt: Date;

	@Column("datetime", { name: "updatedAt" })
	updatedAt: Date;

	@Column("int", { primary: true, name: "couponId" })
	couponId: number;

	@Column("int", { primary: true, name: "companyId" })
	companyId: number;

	@ManyToOne(() => Coupons, (coupons) => coupons.couponCompanies, {
		onDelete: "CASCADE",
		onUpdate: "CASCADE",
	})
	@JoinColumn([{ name: "couponId", referencedColumnName: "id" }])
	coupon: Coupons;

	@ManyToOne(() => Companies, (companies) => companies.couponCompanies, {
		onDelete: "CASCADE",
		onUpdate: "CASCADE",
	})
	@JoinColumn([{ name: "companyId", referencedColumnName: "id" }])
	company: Companies;
}
