import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Companies } from "../company/company.entity";

@Entity("company_types", { schema: "pronto_entregue" })
export class CompanyTypes {
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

	@Column("datetime", { name: "createdAt" })
	createdAt: Date;

	@Column("datetime", { name: "updatedAt" })
	updatedAt: Date;

	@OneToMany(() => Companies, (companies) => companies.companyType)
	companies: Companies[];
}
