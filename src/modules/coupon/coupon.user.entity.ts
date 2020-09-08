import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Coupon } from "./coupon.entity";
import { User } from "../user/user.entity";

@Index("userId", ["userId"], {})
@Entity("coupon_users")
export class CouponUser {
	@Column("datetime", { name: "createdAt" })
	createdAt: Date;

	@Column("datetime", { name: "updatedAt" })
	updatedAt: Date;

	@Column("int", { primary: true, name: "couponId" })
	couponId: number;

	@Column("int", { primary: true, name: "userId" })
	userId: number;

	@ManyToOne(() => Coupon, (coupons) => coupons.couponUsers, {
		onDelete: "CASCADE",
		onUpdate: "CASCADE",
	})
	@JoinColumn([{ name: "couponId", referencedColumnName: "id" }])
	coupon: Coupon;

	@ManyToOne(() => User, (users) => users.couponUsers, {
		onDelete: "CASCADE",
		onUpdate: "CASCADE",
	})
	@JoinColumn([{ name: "userId", referencedColumnName: "id" }])
	user: User;
}
