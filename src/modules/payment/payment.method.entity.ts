import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CompanyPaymentMethods } from "../company/company.payment.method";
import { Orders } from "../order/order.entity";

@Entity("payment_methods", { schema: "pronto_entregue" })
export class PaymentMethods {
	@PrimaryGeneratedColumn({ type: "int", name: "id" })
	id: number;

	@Column("enum", {
		name: "type",
		enum: ["money", "delivery", "app"],
		default: () => "'delivery'",
	})
	type: "money" | "delivery" | "app";

	@Column("varchar", { name: "displayName", nullable: true, length: 255 })
	displayName: string | null;

	@Column("text", { name: "image", nullable: true })
	image: string | null;

	@Column("int", { name: "order", default: () => "'0'" })
	order: number;

	@Column("decimal", {
		name: "fee",
		precision: 10,
		scale: 2,
		default: () => "'0.00'",
	})
	fee: string;

	@Column("enum", {
		name: "feeType",
		enum: ["value", "pct"],
		default: () => "'pct'",
	})
	feeType: "value" | "pct";

	@Column("tinyint", { name: "active", width: 1, default: () => "'1'" })
	active: boolean;

	@Column("datetime", { name: "createdAt" })
	createdAt: Date;

	@Column("datetime", { name: "updatedAt" })
	updatedAt: Date;

	@OneToMany(
		() => CompanyPaymentMethods,
		(companyPaymentMethods) => companyPaymentMethods.paymentMethod
	)
	companyPaymentMethods: CompanyPaymentMethods[];

	@OneToMany(() => Orders, (orders) => orders.paymentMethod)
	orders: Orders[];
}
