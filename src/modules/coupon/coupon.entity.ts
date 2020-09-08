import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CouponCompanies } from "./coupon.company.entity";
import { CouponProducts } from "./coupon.product";
import { CouponUsers } from "./coupon.user.entity";
import { Orders } from "../order/order.entity";

@Entity("coupons", { schema: "pronto_entregue" })
export class Coupons {
	@PrimaryGeneratedColumn({ type: "int", name: "id" })
	id: number;

	@Column("varchar", { name: "name", nullable: true, length: 255 })
	name: string | null;

	@Column("text", { name: "image", nullable: true })
	image: string | null;

	@Column("datetime", { name: "startsAt", nullable: true })
	startsAt: Date | null;

	@Column("datetime", { name: "expiresAt", nullable: true })
	expiresAt: Date | null;

	@Column("varchar", { name: "description", nullable: true, length: 255 })
	description: string | null;

	@Column("tinyint", {
		name: "masterOnly",
		nullable: true,
		comment: "Se verdadeiro, apenas usuário master consegue alterar",
		width: 1,
		default: () => "'0'",
	})
	masterOnly: boolean | null;

	@Column("tinyint", {
		name: "onlyFirstPurchases",
		nullable: true,
		comment:
			"Se verdadeiro, apenas válido apenas para primeira compra de cada usuário",
		width: 1,
		default: () => "'0'",
	})
	onlyFirstPurchases: boolean | null;

	@Column("tinyint", {
		name: "featured",
		nullable: true,
		comment: "Se verdadeiro, usuário pode pegar cupom na home do app",
		width: 1,
		default: () => "'0'",
	})
	featured: boolean | null;

	@Column("tinyint", {
		name: "active",
		nullable: true,
		width: 1,
		default: () => "'1'",
	})
	active: boolean | null;

	@Column("decimal", {
		name: "taxable",
		nullable: true,
		comment: "Porcentagem do cupom que será pago pelo estabelecimento",
		precision: 10,
		scale: 2,
		default: () => "'100.00'",
	})
	taxable: string | null;

	@Column("int", { name: "maxPerUser", nullable: true, default: () => "'1'" })
	maxPerUser: number | null;

	@Column("int", { name: "maxPurchases", nullable: true, default: () => "'0'" })
	maxPurchases: number | null;

	@Column("decimal", {
		name: "minValue",
		nullable: true,
		precision: 10,
		scale: 2,
		default: () => "'0.00'",
	})
	minValue: string | null;

	@Column("decimal", {
		name: "maxValue",
		nullable: true,
		precision: 10,
		scale: 2,
		default: () => "'0.00'",
	})
	maxValue: string | null;

	@Column("enum", {
		name: "valueType",
		enum: ["value", "percentage"],
		default: () => "'percentage'",
	})
	valueType: "value" | "percentage";

	@Column("decimal", { name: "value", nullable: true, precision: 2, scale: 0 })
	value: string | null;

	@Column("tinyint", { name: "freeDelivery", width: 1, default: () => "'0'" })
	freeDelivery: boolean;

	@Column("datetime", { name: "createdAt" })
	createdAt: Date;

	@Column("datetime", { name: "updatedAt" })
	updatedAt: Date;

	@OneToMany(() => CouponCompanies, (couponCompanies) => couponCompanies.coupon)
	couponCompanies: CouponCompanies[];

	@OneToMany(() => CouponProducts, (couponProducts) => couponProducts.coupon)
	couponProducts: CouponProducts[];

	@OneToMany(() => CouponUsers, (couponUsers) => couponUsers.coupon)
	couponUsers: CouponUsers[];

	@OneToMany(() => Orders, (orders) => orders.coupon)
	orders: Orders[];
}
