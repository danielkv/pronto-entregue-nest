import {
	Column,
	Entity,
	Index,
	JoinColumn,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
} from "typeorm";
import { OptionsGroups } from "./option.group.entity";
import { OrderOptions } from "../order/order.option.entity";

@Index("optionsGroupId", ["optionsGroupId"], {})
@Entity("options", { schema: "pronto_entregue" })
export class Options {
	@PrimaryGeneratedColumn({ type: "int", name: "id" })
	id: number;

	@Column("varchar", { name: "name", nullable: true, length: 255 })
	name: string | null;

	@Column("varchar", { name: "description", nullable: true, length: 255 })
	description: string | null;

	@Column("int", { name: "order", default: () => "'0'" })
	order: number;

	@Column("int", { name: "maxSelectRestrainOther", nullable: true })
	maxSelectRestrainOther: number | null;

	@Column("tinyint", {
		name: "active",
		nullable: true,
		width: 1,
		default: () => "'1'",
	})
	active: boolean | null;

	@Column("tinyint", { name: "removed", width: 1, default: () => "'0'" })
	removed: boolean;

	@Column("decimal", { name: "price", nullable: true, precision: 10, scale: 2 })
	price: string | null;

	@Column("datetime", { name: "createdAt" })
	createdAt: Date;

	@Column("datetime", { name: "updatedAt" })
	updatedAt: Date;

	@Column("int", { name: "optionsGroupId", nullable: true })
	optionsGroupId: number | null;

	@ManyToOne(() => OptionsGroups, (optionsGroups) => optionsGroups.options, {
		onDelete: "SET NULL",
		onUpdate: "CASCADE",
	})
	@JoinColumn([{ name: "optionsGroupId", referencedColumnName: "id" }])
	optionsGroup: OptionsGroups;

	@OneToMany(() => OrderOptions, (orderOptions) => orderOptions.optionRelated)
	orderOptions: OrderOptions[];
}
