import {
	Column,
	Entity,
	Index,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
} from "typeorm";
import { Orders } from "../order/order.entity";
import { Users } from "../user/user.entity";

@Index("orderId", ["orderId"], {})
@Index("deliveryManId", ["deliveryManId"], {})
@Entity("deliveries", { schema: "pronto_entregue" })
export class Deliveries {
	@PrimaryGeneratedColumn({ type: "int", name: "id" })
	id: number;

	@Column("varchar", { name: "description", nullable: true, length: 255 })
	description: string | null;

	@Column("enum", {
		name: "size",
		nullable: true,
		enum: ["small", "medium", "large"],
		default: () => "'medium'",
	})
	size: "small" | "medium" | "large" | null;

	@Column("enum", {
		name: "status",
		nullable: true,
		enum: ["waiting", "waitingDelivery", "delivering", "delivered", "canceled"],
		default: () => "'waitingDelivery'",
	})
	status:
		| "waiting"
		| "waitingDelivery"
		| "delivering"
		| "delivered"
		| "canceled"
		| null;

	@Column("decimal", { name: "value", nullable: true, precision: 2, scale: 0 })
	value: string | null;

	@Column("varchar", { name: "receiverName", nullable: true, length: 255 })
	receiverName: string | null;

	@Column("varchar", { name: "receiverContact", nullable: true, length: 255 })
	receiverContact: string | null;

	@Column("varchar", { name: "senderContact", nullable: true, length: 255 })
	senderContact: string | null;

	@Column("varchar", { name: "nameAddressFrom", nullable: true, length: 255 })
	nameAddressFrom: string | null;

	@Column("varchar", { name: "streetAddressFrom", nullable: true, length: 255 })
	streetAddressFrom: string | null;

	@Column("int", { name: "numberAddressFrom", nullable: true })
	numberAddressFrom: number | null;

	@Column("varchar", {
		name: "complementAddressFrom",
		nullable: true,
		length: 255,
	})
	complementAddressFrom: string | null;

	@Column("varchar", {
		name: "districtAddressFrom",
		nullable: true,
		length: 255,
	})
	districtAddressFrom: string | null;

	@Column("int", { name: "zipcodeAddressFrom", nullable: true })
	zipcodeAddressFrom: number | null;

	@Column("varchar", { name: "cityAddressFrom", nullable: true, length: 255 })
	cityAddressFrom: string | null;

	@Column("varchar", { name: "stateAddressFrom", nullable: true, length: 255 })
	stateAddressFrom: string | null;

	@Column("varchar", {
		name: "referenceAddressFrom",
		nullable: true,
		length: 255,
	})
	referenceAddressFrom: string | null;

	@Column("point", { name: "locationAddressFrom", nullable: true })
	locationAddressFrom: string | null;

	@Column("varchar", { name: "nameAddressTo", nullable: true, length: 255 })
	nameAddressTo: string | null;

	@Column("varchar", { name: "streetAddressTo", nullable: true, length: 255 })
	streetAddressTo: string | null;

	@Column("int", { name: "numberAddressTo", nullable: true })
	numberAddressTo: number | null;

	@Column("varchar", {
		name: "complementAddressTo",
		nullable: true,
		length: 255,
	})
	complementAddressTo: string | null;

	@Column("varchar", { name: "districtAddressTo", nullable: true, length: 255 })
	districtAddressTo: string | null;

	@Column("int", { name: "zipcodeAddressTo", nullable: true })
	zipcodeAddressTo: number | null;

	@Column("varchar", { name: "cityAddressTo", nullable: true, length: 255 })
	cityAddressTo: string | null;

	@Column("varchar", { name: "stateAddressTo", nullable: true, length: 255 })
	stateAddressTo: string | null;

	@Column("varchar", {
		name: "referenceAddressTo",
		nullable: true,
		length: 255,
	})
	referenceAddressTo: string | null;

	@Column("point", { name: "locationAddressTo", nullable: true })
	locationAddressTo: string | null;

	@Column("datetime", { name: "createdAt" })
	createdAt: Date;

	@Column("datetime", { name: "updatedAt" })
	updatedAt: Date;

	@Column("int", { name: "orderId", nullable: true })
	orderId: number | null;

	@Column("int", { name: "deliveryManId", nullable: true })
	deliveryManId: number | null;

	@ManyToOne(() => Orders, (orders) => orders.deliveries, {
		onDelete: "SET NULL",
		onUpdate: "CASCADE",
	})
	@JoinColumn([{ name: "orderId", referencedColumnName: "id" }])
	order: Orders;

	@ManyToOne(() => Users, (users) => users.deliveries, {
		onDelete: "SET NULL",
		onUpdate: "CASCADE",
	})
	@JoinColumn([{ name: "deliveryManId", referencedColumnName: "id" }])
	deliveryMan: Users;
}
