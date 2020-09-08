import {
	Column,
	Entity,
	Index,
	JoinColumn,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
} from "typeorm";
import { Options } from "./option.entity";
import { Product } from "./product.entity";
import { OrderOptionGroup } from "../order/order.option.group.entity";

@Index("productId", ["productId"], {})
@Index("maxSelectRestrain", ["maxSelectRestrain"], {})
@Entity("options_groups")
export class OptionGroup {
	@PrimaryGeneratedColumn({ type: "int", name: "id" })
	id: number;

	@Column("varchar", { name: "name", nullable: true, length: 255 })
	name: string | null;

	@Column("enum", {
		name: "type",
		enum: ["single", "multi"],
		default: 'single',
	})
	type: "single" | "multi";

	@Column("enum", {
		name: "priceType",
		enum: ["higher", "sum"],
		default: 'higher',
	})
	priceType: "higher" | "sum";

	@Column("int", { name: "order", default: 0 })
	order: number;

	@Column("int", { name: "minSelect", nullable: true })
	minSelect: number | null;

	@Column("int", { name: "maxSelect", nullable: true })
	maxSelect: number | null;

	@Column({
		type: 'boolean',
		name: "active",
		nullable: true,
		default: true,
	})
	active: boolean | null;

	@Column({ type: 'boolean', name: "removed", default: false })
	removed: boolean;

	@Column("datetime", { name: "createdAt" })
	createdAt: Date;

	@Column("datetime", { name: "updatedAt" })
	updatedAt: Date;

	@Column("int", { name: "productId", nullable: true })
	productId: number | null;

	@Column("int", { name: "maxSelectRestrain", nullable: true })
	maxSelectRestrain: number | null;

	@OneToMany(() => Options, (options) => options.optionsGroup)
	options: Options[];

	@ManyToOne(() => Product, (products) => products.optionsGroups, {
		onDelete: "SET NULL",
		onUpdate: "CASCADE",
	})
	@JoinColumn([{ name: "productId", referencedColumnName: "id" }])
	product: Product;

	@ManyToOne(
		() => OptionGroup,
		(optionsGroups) => optionsGroups.optionsGroups,
		{ onDelete: "SET NULL", onUpdate: "CASCADE" }
	)
	@JoinColumn([{ name: "maxSelectRestrain", referencedColumnName: "id" }])
	maxSelectRestrain2: OptionGroup;

	@OneToMany(
		() => OptionGroup,
		(optionsGroups) => optionsGroups.maxSelectRestrain2
	)
	optionsGroups: OptionGroup[];

	@OneToMany(
		() => OrderOptionGroup,
		(orderOptionGroups) => orderOptionGroups.optionsGroupRelated
	)
	orderOptionGroups: OrderOptionGroup[];
}
