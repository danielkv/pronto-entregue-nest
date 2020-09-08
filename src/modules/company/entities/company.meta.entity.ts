import {
	Column,
	Entity,
	Index,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
} from "typeorm";
import { Company } from "./company.entity";

@Index("companyId", ["companyId"], {})
@Entity("company_metas")
export class CompanyMeta {
	@PrimaryGeneratedColumn({ type: "int", name: "id" })
	id: number;

	@Column("varchar", {
		name: "key",
		nullable: true,
		comment: "phone | email | document | businessHours | address | ...",
		length: 255,
	})
	key: string | null;

	@Column("text", { name: "value", nullable: true })
	value: string | null;

	@Column({
		type: 'boolean',
		name: "unique",
		nullable: true,
		default: false,
	})
	unique: boolean | null;

	@Column("datetime", { name: "createdAt" })
	createdAt: Date;

	@Column("datetime", { name: "updatedAt" })
	updatedAt: Date;

	@Column("int", { name: "companyId", nullable: true })
	companyId: number | null;

	@Column("varchar", { name: "type", nullable: true, length: 255 })
	type: string | null;

	@ManyToOne(() => Company, (companies) => companies.companyMetas, {
		onDelete: "SET NULL",
		onUpdate: "CASCADE",
	})
	@JoinColumn([{ name: "companyId", referencedColumnName: "id" }])
	company: Company;
}
