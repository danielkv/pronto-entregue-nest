import {
	Column,
	Entity,
	Index,
	JoinColumn,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
} from "typeorm";
import { Companies } from "../company/company.entity";
import { Products } from "../product/product.entity";

@Index("companyId", ["companyId"], {})
@Entity("categories", { schema: "pronto_entregue" })
export class Categories {
	@PrimaryGeneratedColumn({ type: "int", name: "id" })
	id: number;

	@Column("varchar", { name: "name", nullable: true, length: 255 })
	name: string | null;

	@Column("varchar", { name: "image", nullable: true, length: 255 })
	image: string | null;

	@Column("varchar", { name: "description", nullable: true, length: 255 })
	description: string | null;

	@Column("tinyint", {
		name: "active",
		nullable: true,
		width: 1,
		default: () => "'1'",
	})
	active: boolean | null;

	@Column("int", { name: "order", default: () => "'0'" })
	order: number;

	@Column("datetime", { name: "createdAt" })
	createdAt: Date;

	@Column("datetime", { name: "updatedAt" })
	updatedAt: Date;

	@Column("int", { name: "companyId", nullable: true })
	companyId: number | null;

	@ManyToOne(() => Companies, (companies) => companies.categories, {
		onDelete: "SET NULL",
		onUpdate: "CASCADE",
	})
	@JoinColumn([{ name: "companyId", referencedColumnName: "id" }])
	company: Companies;

	@OneToMany(() => Products, (products) => products.category)
	products: Products[];
}
