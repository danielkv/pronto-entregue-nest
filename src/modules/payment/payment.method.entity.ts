import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CompanyPaymentMethod } from "../company/entities/company.payment.method.entity";
import { Order } from "../order/order.entity";

@Entity("payment_methods")
export class PaymentMethod {
	@PrimaryGeneratedColumn({ type: "int", name: "id" })
	id: number;

	@Column("enum", {
		name: "type",
		enum: ["money", "delivery", "app"],
		default: 'delivery',
	})
	type: "money" | "delivery" | "app";

	@Column("varchar", { name: "displayName", nullable: true, length: 255 })
	displayName: string | null;

	@Column("text", { name: "image", nullable: true })
	image: string | null;

	@Column("int", { name: "order", default: 0 })
	order: number;

	@Column("decimal", {
		name: "fee",
		precision: 10,
		scale: 2,
		default: 0,
	})
	fee: string;

	@Column("enum", {
		name: "feeType",
		enum: ["value", "pct"],
		default: 'pct',
	})
	feeType: "value" | "pct";

	@Column({ type: 'boolean', name: "active", default: true })
	active: boolean;

	@Column("datetime", { name: "createdAt" })
	createdAt: Date;

	@Column("datetime", { name: "updatedAt" })
	updatedAt: Date;

	@OneToMany(
		() => CompanyPaymentMethod,
		(companyPaymentMethods) => companyPaymentMethods.paymentMethod
	)
	companyPaymentMethods: CompanyPaymentMethod[];

	@OneToMany(() => Order, (orders) => orders.paymentMethod)
	orders: Order[];
}
