import {
	Column,
	Entity,
	Index,
	JoinColumn,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
} from "typeorm";
import { Delivery } from "../delivery/delivery.entity";
import { OrderProduct } from "./order.product.entity";
import { User } from "../user/user.entity";
import { Company } from "../company/entities/company.entity";
import { PaymentMethod } from "../payment/payment.method.entity";
import { CreditHistory } from "../credit/credit.history.entity";
import { Coupon } from "../coupon/coupon.entity";
import { Rating } from "../rating/rating.entity";

@Index("userId", ["userId"], {})
@Index("companyId", ["companyId"], {})
@Index("paymentMethodId", ["paymentMethodId"], {})
@Index("creditHistoryId", ["creditHistoryId"], {})
@Index("orders_couponId_foreign_idx", ["couponId"], {})
@Entity("orders")
export class Order {
	@PrimaryGeneratedColumn({ type: "int", name: "id" })
	id: number;

	@Column("decimal", {
		name: "paymentFee",
		nullable: true,
		precision: 10,
		scale: 2,
	})
	paymentFee: string | null;

	@Column("decimal", {
		name: "deliveryPrice",
		nullable: true,
		precision: 10,
		scale: 2,
	})
	deliveryPrice: string | null;

	@Column("int", { name: "deliveryTime", default: 0 })
	deliveryTime: number;

	@Column("enum", {
		name: "type",
		enum: ["takeout", "delivery", "peDelivery"],
		default: 'delivery',
	})
	type: "takeout" | "delivery" | "peDelivery";

	@Column("decimal", { name: "price", nullable: true, precision: 10, scale: 2 })
	price: string | null;

	@Column("decimal", {
		name: "discount",
		nullable: true,
		precision: 10,
		scale: 2,
	})
	discount: string | null;

	@Column("enum", {
		name: "status",
		nullable: true,
		enum: [
			"waiting",
			"scheduled",
			"preparing",
			"waitingPickUp",
			"waitingDelivery",
			"delivering",
			"delivered",
			"canceled",
		],
		default: 'waiting',
	})
	status:
		| "waiting"
		| "scheduled"
		| "preparing"
		| "waitingPickUp"
		| "waitingDelivery"
		| "delivering"
		| "delivered"
		| "canceled"
		| null;

	@Column("text", { name: "message", nullable: true })
	message: string | null;

	@Column("varchar", { name: "nameAddress", nullable: true, length: 255 })
	nameAddress: string | null;

	@Column("varchar", { name: "streetAddress", nullable: true, length: 255 })
	streetAddress: string | null;

	@Column("int", { name: "numberAddress", nullable: true })
	numberAddress: number | null;

	@Column("varchar", { name: "complementAddress", nullable: true, length: 255 })
	complementAddress: string | null;

	@Column("varchar", { name: "referenceAddress", nullable: true, length: 255 })
	referenceAddress: string | null;

	@Column("varchar", { name: "districtAddress", nullable: true, length: 255 })
	districtAddress: string | null;

	@Column("int", { name: "zipcodeAddress", nullable: true })
	zipcodeAddress: number | null;

	@Column("varchar", { name: "cityAddress", nullable: true, length: 255 })
	cityAddress: string | null;

	@Column("varchar", { name: "stateAddress", nullable: true, length: 255 })
	stateAddress: string | null;

	@Column("point", { name: "locationAddress", nullable: true })
	locationAddress: string | null;

	@Column("datetime", { name: "createdAt" })
	createdAt: Date;

	@Column("datetime", { name: "updatedAt" })
	updatedAt: Date;

	@Column("int", { name: "userId", nullable: true })
	userId: number | null;

	@Column("int", { name: "companyId", nullable: true })
	companyId: number | null;

	@Column("int", { name: "paymentMethodId", nullable: true })
	paymentMethodId: number | null;

	@Column("int", { name: "creditHistoryId", nullable: true })
	creditHistoryId: number | null;

	@Column("int", { name: "couponId", nullable: true })
	couponId: number | null;

	@Column("datetime", { name: "scheduledTo", nullable: true })
	scheduledTo: Date | null;

	@OneToMany(() => Delivery, (deliveries) => deliveries.order)
	deliveries: Delivery[];

	@OneToMany(() => OrderProduct, (orderProducts) => orderProducts.order)
	orderProducts: OrderProduct[];

	@ManyToOne(() => User, (users) => users.orders, {
		onDelete: "SET NULL",
		onUpdate: "CASCADE",
	})
	@JoinColumn([{ name: "userId", referencedColumnName: "id" }])
	user: User;

	@ManyToOne(() => Company, (companies) => companies.orders, {
		onDelete: "SET NULL",
		onUpdate: "CASCADE",
	})
	@JoinColumn([{ name: "companyId", referencedColumnName: "id" }])
	company: Company;

	@ManyToOne(() => PaymentMethod, (paymentMethods) => paymentMethods.orders, {
		onDelete: "SET NULL",
		onUpdate: "CASCADE",
	})
	@JoinColumn([{ name: "paymentMethodId", referencedColumnName: "id" }])
	paymentMethod: PaymentMethod;

	@ManyToOne(() => CreditHistory, (creditHistory) => creditHistory.orders, {
		onDelete: "SET NULL",
		onUpdate: "CASCADE",
	})
	@JoinColumn([{ name: "creditHistoryId", referencedColumnName: "id" }])
	creditHistory: CreditHistory;

	@ManyToOne(() => Coupon, (coupons) => coupons.orders, {
		onDelete: "SET NULL",
		onUpdate: "CASCADE",
	})
	@JoinColumn([{ name: "couponId", referencedColumnName: "id" }])
	coupon: Coupon;

	@OneToMany(() => Rating, (ratings) => ratings.order)
	ratings: Rating[];
}
