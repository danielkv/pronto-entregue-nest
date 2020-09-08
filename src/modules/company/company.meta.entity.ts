import {
	Column,
	Entity,
	Index,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
} from "typeorm";
import { Companies } from "../company/company.entity";

@Index("companyId", ["companyId"], {})
@Entity("company_metas", { schema: "pronto_entregue" })
export class CompanyMetas {
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

	@Column("tinyint", {
		name: "unique",
		nullable: true,
		width: 1,
		default: () => "'0'",
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

	@ManyToOne(() => Companies, (companies) => companies.companyMetas, {
		onDelete: "SET NULL",
		onUpdate: "CASCADE",
	})
	@JoinColumn([{ name: "companyId", referencedColumnName: "id" }])
	company: Companies;
}
