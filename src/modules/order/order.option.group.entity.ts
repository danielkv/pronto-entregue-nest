import {
	Column,
	Entity,
	Index,
	JoinColumn,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
} from "typeorm";
import { OrderProduct } from "./order.product.entity";
import { OptionGroup } from "../product/option.group.entity";
import { OrderOption } from "./order.option.entity";

@Index("orderProductId", ["orderProductId"], {})
@Index("optionsGroupRelatedId", ["optionsGroupRelatedId"], {})
@Entity("order_option_groups")
export class OrderOptionGroup {
	@PrimaryGeneratedColumn({ type: "int", name: "id" })
	id: number;

	@Column("varchar", { name: "name", nullable: true, length: 255 })
	name: string | null;

	@Column("enum", {
		name: "priceType",
		enum: ["higher", "sum"],
		default: 'higher',
	})
	priceType: "higher" | "sum";

	@Column("datetime", { name: "createdAt" })
	createdAt: Date;

	@Column("datetime", { name: "updatedAt" })
	updatedAt: Date;

	@Column("int", { name: "orderProductId", nullable: true, unsigned: true })
	orderProductId: number | null;

	@Column("int", { name: "optionsGroupRelatedId", nullable: true })
	optionsGroupRelatedId: number | null;

	@ManyToOne(
		() => OrderProduct,
		(orderProducts) => orderProducts.orderOptionGroups,
		{ onDelete: "CASCADE", onUpdate: "CASCADE" }
	)
	@JoinColumn([{ name: "orderProductId", referencedColumnName: "id" }])
	orderProduct: OrderProduct;

	@ManyToOne(
		() => OptionGroup,
		(optionsGroups) => optionsGroups.orderOptionGroups,
		{ onDelete: "SET NULL", onUpdate: "CASCADE" }
	)
	@JoinColumn([{ name: "optionsGroupRelatedId", referencedColumnName: "id" }])
	optionsGroupRelated: OptionGroup;

	@OneToMany(
		() => OrderOption,
		(orderOptions) => orderOptions.orderOptionsGroup
	)
	orderOptions: OrderOption[];
}
