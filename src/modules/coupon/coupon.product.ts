import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Coupons } from "./coupon.entity";
import { Products } from "../product/product.entity";

@Index("productId", ["productId"], {})
@Entity("coupon_products", { schema: "pronto_entregue" })
export class CouponProducts {
	@Column("datetime", { name: "createdAt" })
	createdAt: Date;

	@Column("datetime", { name: "updatedAt" })
	updatedAt: Date;

	@Column("int", { primary: true, name: "couponId" })
	couponId: number;

	@Column("int", { primary: true, name: "productId" })
	productId: number;

	@ManyToOne(() => Coupons, (coupons) => coupons.couponProducts, {
		onDelete: "CASCADE",
		onUpdate: "CASCADE",
	})
	@JoinColumn([{ name: "couponId", referencedColumnName: "id" }])
	coupon: Coupons;

	@ManyToOne(() => Products, (products) => products.couponProducts, {
		onDelete: "CASCADE",
		onUpdate: "CASCADE",
	})
	@JoinColumn([{ name: "productId", referencedColumnName: "id" }])
	product: Products;
}
