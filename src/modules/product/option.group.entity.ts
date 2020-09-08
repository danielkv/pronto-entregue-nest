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
import { Products } from "./product.entity";
import { OrderOptionGroups } from "../order/order.option.group.entity";

@Index("productId", ["productId"], {})
@Index("maxSelectRestrain", ["maxSelectRestrain"], {})
@Entity("options_groups", { schema: "pronto_entregue" })
export class OptionsGroups {
	@PrimaryGeneratedColumn({ type: "int", name: "id" })
	id: number;

	@Column("varchar", { name: "name", nullable: true, length: 255 })
	name: string | null;

	@Column("enum", {
		name: "type",
		enum: ["single", "multi"],
		default: () => "'single'",
	})
	type: "single" | "multi";

	@Column("enum", {
		name: "priceType",
		enum: ["higher", "sum"],
		default: () => "'higher'",
	})
	priceType: "higher" | "sum";

	@Column("int", { name: "order", default: () => "'0'" })
	order: number;

	@Column("int", { name: "minSelect", nullable: true })
	minSelect: number | null;

	@Column("int", { name: "maxSelect", nullable: true })
	maxSelect: number | null;

	@Column("tinyint", {
		name: "active",
		nullable: true,
		width: 1,
		default: () => "'1'",
	})
	active: boolean | null;

	@Column("tinyint", { name: "removed", width: 1, default: () => "'0'" })
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

	@ManyToOne(() => Products, (products) => products.optionsGroups, {
		onDelete: "SET NULL",
		onUpdate: "CASCADE",
	})
	@JoinColumn([{ name: "productId", referencedColumnName: "id" }])
	product: Products;

	@ManyToOne(
		() => OptionsGroups,
		(optionsGroups) => optionsGroups.optionsGroups,
		{ onDelete: "SET NULL", onUpdate: "CASCADE" }
	)
	@JoinColumn([{ name: "maxSelectRestrain", referencedColumnName: "id" }])
	maxSelectRestrain2: OptionsGroups;

	@OneToMany(
		() => OptionsGroups,
		(optionsGroups) => optionsGroups.maxSelectRestrain2
	)
	optionsGroups: OptionsGroups[];

	@OneToMany(
		() => OrderOptionGroups,
		(orderOptionGroups) => orderOptionGroups.optionsGroupRelated
	)
	orderOptionGroups: OrderOptionGroups[];
}
