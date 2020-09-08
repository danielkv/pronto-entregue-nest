import {
	Column,
	Entity,
	Index,
	JoinColumn,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
} from "typeorm";
import { OrderOptionGroups } from "./order.option.group.entity";
import { Products } from "../product/product.entity";
import { Orders } from "./order.entity";

@Index("productId", ["productId"], {})
@Index("orderId", ["orderId"], {})
@Index("productRelatedId", ["productRelatedId"], {})
@Entity("order_products", { schema: "pronto_entregue" })
export class OrderProducts {
	@PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
	id: number;

	@Column("int", { name: "quantity", nullable: true })
	quantity: number | null;

	@Column("varchar", { name: "name", nullable: true, length: 255 })
	name: string | null;

	@Column("decimal", { name: "price", nullable: true, precision: 10, scale: 2 })
	price: string | null;

	@Column("varchar", { name: "message", nullable: true, length: 255 })
	message: string | null;

	@Column("datetime", { name: "createdAt" })
	createdAt: Date;

	@Column("datetime", { name: "updatedAt" })
	updatedAt: Date;

	@Column("int", { name: "productId", nullable: true })
	productId: number | null;

	@Column("int", { name: "orderId", nullable: true })
	orderId: number | null;

	@Column("int", { name: "productRelatedId", nullable: true })
	productRelatedId: number | null;

	@OneToMany(
		() => OrderOptionGroups,
		(orderOptionGroups) => orderOptionGroups.orderProduct
	)
	orderOptionGroups: OrderOptionGroups[];

	@ManyToOne(() => Products, (products) => products.orderProducts, {
		onDelete: "SET NULL",
		onUpdate: "CASCADE",
	})
	@JoinColumn([{ name: "productId", referencedColumnName: "id" }])
	product: Products;

	@ManyToOne(() => Orders, (orders) => orders.orderProducts, {
		onDelete: "SET NULL",
		onUpdate: "CASCADE",
	})
	@JoinColumn([{ name: "orderId", referencedColumnName: "id" }])
	order: Orders;

	@ManyToOne(() => Products, (products) => products.orderProducts2, {
		onDelete: "SET NULL",
		onUpdate: "CASCADE",
	})
	@JoinColumn([{ name: "productRelatedId", referencedColumnName: "id" }])
	productRelated: Products;
}
