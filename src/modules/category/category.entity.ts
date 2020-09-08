import {
	Column,
	Entity,
	Index,
	JoinColumn,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
} from "typeorm";
import { Company } from "../company/entities/company.entity";
import { Product } from "../product/product.entity";

@Index("companyId", ["companyId"], {})
@Entity("categories")
export class Category {
	@PrimaryGeneratedColumn({ type: "int", name: "id" })
	id: number;

	@Column("varchar", { name: "name", nullable: true, length: 255 })
	name: string | null;

	@Column("varchar", { name: "image", nullable: true, length: 255 })
	image: string | null;

	@Column("varchar", { name: "description", nullable: true, length: 255 })
	description: string | null;

	@Column({
		type: 'boolean',
		name: "active",
		nullable: true,
		default: true,
	})
	active: boolean | null;

	@Column("int", { name: "order", default: 0 })
	order: number;

	@Column("datetime", { name: "createdAt" })
	createdAt: Date;

	@Column("datetime", { name: "updatedAt" })
	updatedAt: Date;

	@Column("int", { name: "companyId", nullable: true })
	companyId: number | null;

	@ManyToOne(() => Company, (companies) => companies.categories, {
		onDelete: "SET NULL",
		onUpdate: "CASCADE",
	})
	@JoinColumn([{ name: "companyId", referencedColumnName: "id" }])
	company: Company;

	@OneToMany(() => Product, (products) => products.category)
	products: Product[];
}
