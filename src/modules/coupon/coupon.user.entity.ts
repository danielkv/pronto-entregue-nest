import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Coupons } from "./coupon.entity";
import { Users } from "../user/user.entity";

@Index("userId", ["userId"], {})
@Entity("coupon_users", { schema: "pronto_entregue" })
export class CouponUsers {
	@Column("datetime", { name: "createdAt" })
	createdAt: Date;

	@Column("datetime", { name: "updatedAt" })
	updatedAt: Date;

	@Column("int", { primary: true, name: "couponId" })
	couponId: number;

	@Column("int", { primary: true, name: "userId" })
	userId: number;

	@ManyToOne(() => Coupons, (coupons) => coupons.couponUsers, {
		onDelete: "CASCADE",
		onUpdate: "CASCADE",
	})
	@JoinColumn([{ name: "couponId", referencedColumnName: "id" }])
	coupon: Coupons;

	@ManyToOne(() => Users, (users) => users.couponUsers, {
		onDelete: "CASCADE",
		onUpdate: "CASCADE",
	})
	@JoinColumn([{ name: "userId", referencedColumnName: "id" }])
	user: Users;
}
