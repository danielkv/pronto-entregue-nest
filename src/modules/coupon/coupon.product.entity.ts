import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Coupon } from "./coupon.entity";
import { Product } from "../product/product.entity";

@Index("productId", ["productId"], {})
@Entity("coupon_products")
export class CouponProduct {
	@Column("datetime", { name: "createdAt" })
	createdAt: Date;

	@Column("datetime", { name: "updatedAt" })
	updatedAt: Date;

	@Column("int", { primary: true, name: "couponId" })
	couponId: number;

	@Column("int", { primary: true, name: "productId" })
	productId: number;

	@ManyToOne(() => Coupon, (coupons) => coupons.couponProducts, {
		onDelete: "CASCADE",
		onUpdate: "CASCADE",
	})
	@JoinColumn([{ name: "couponId", referencedColumnName: "id" }])
	coupon: Coupon;

	@ManyToOne(() => Product, (products) => products.couponProducts, {
		onDelete: "CASCADE",
		onUpdate: "CASCADE",
	})
	@JoinColumn([{ name: "productId", referencedColumnName: "id" }])
	product: Product;
}
