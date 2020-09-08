import {
	Column,
	Entity,
	Index,
	JoinColumn,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
} from "typeorm";
import { OrderOptionGroup } from "./order.option.group.entity";
import { Product } from "../product/product.entity";
import { Order } from "./order.entity";

@Index("productId", ["productId"], {})
@Index("orderId", ["orderId"], {})
@Index("productRelatedId", ["productRelatedId"], {})
@Entity("order_products")
export class OrderProduct {
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
		() => OrderOptionGroup,
		(orderOptionGroups) => orderOptionGroups.orderProduct
	)
	orderOptionGroups: OrderOptionGroup[];

	@ManyToOne(() => Product, (products) => products.orderProducts, {
		onDelete: "SET NULL",
		onUpdate: "CASCADE",
	})
	@JoinColumn([{ name: "productId", referencedColumnName: "id" }])
	product: Product;

	@ManyToOne(() => Order, (orders) => orders.orderProducts, {
		onDelete: "SET NULL",
		onUpdate: "CASCADE",
	})
	@JoinColumn([{ name: "orderId", referencedColumnName: "id" }])
	order: Order;

	@ManyToOne(() => Product, (products) => products.orderProducts2, {
		onDelete: "SET NULL",
		onUpdate: "CASCADE",
	})
	@JoinColumn([{ name: "productRelatedId", referencedColumnName: "id" }])
	productRelated: Product;
}
