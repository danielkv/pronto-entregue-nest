import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CouponCompany } from "./coupon.company.entity";
import { CouponProduct } from "./coupon.product.entity";
import { CouponUser } from "./coupon.user.entity";
import { Order } from "../order/order.entity";

@Entity("coupons")
export class Coupon {
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

	@Column({
		type: 'boolean',
		name: "masterOnly",
		nullable: true,
		comment: "Se verdadeiro, apenas usuário master consegue alterar",
		default: false,
	})
	masterOnly: boolean | null;

	@Column({
		type: 'boolean',
		name: "onlyFirstPurchases",
		nullable: true,
		comment: "Se verdadeiro, apenas válido apenas para primeira compra de cada usuário",
		default: false,
	})
	onlyFirstPurchases: boolean | null;

	@Column({
		type: 'boolean',
		name: "featured",
		nullable: true,
		comment: "Se verdadeiro, usuário pode pegar cupom na home do app",
		default: false,
	})
	featured: boolean | null;

	@Column({
		type: 'boolean',
		name: "active",
		nullable: true,
		default: true,
	})
	active: boolean | null;

	@Column("decimal", {
		name: "taxable",
		nullable: true,
		comment: "Porcentagem do cupom que será pago pelo estabelecimento",
		precision: 10,
		scale: 2,
		default: 100,
	})
	taxable: string | null;

	@Column("int", { name: "maxPerUser", nullable: true, default: 1 })
	maxPerUser: number | null;

	@Column("int", { name: "maxPurchases", nullable: true, default: 0 })
	maxPurchases: number | null;

	@Column("decimal", {
		name: "minValue",
		nullable: true,
		precision: 10,
		scale: 2,
		default: 0,
	})
	minValue: string | null;

	@Column("decimal", {
		name: "maxValue",
		nullable: true,
		precision: 10,
		scale: 2,
		default: 0,
	})
	maxValue: string | null;

	@Column("enum", {
		name: "valueType",
		enum: ["value", "percentage"],
		default: 'percentage',
	})
	valueType: "value" | "percentage";

	@Column("decimal", { name: "value", nullable: true, precision: 2, scale: 0 })
	value: string | null;

	@Column({ type: 'boolean', name: "freeDelivery", default: false })
	freeDelivery: boolean;

	@Column("datetime", { name: "createdAt" })
	createdAt: Date;

	@Column("datetime", { name: "updatedAt" })
	updatedAt: Date;

	@OneToMany(() => CouponCompany, (couponCompanies) => couponCompanies.coupon)
	couponCompanies: CouponCompany[];

	@OneToMany(() => CouponProduct, (couponProducts) => couponProducts.coupon)
	couponProducts: CouponProduct[];

	@OneToMany(() => CouponUser, (couponUsers) => couponUsers.coupon)
	couponUsers: CouponUser[];

	@OneToMany(() => Order, (orders) => orders.coupon)
	orders: Order[];
}
