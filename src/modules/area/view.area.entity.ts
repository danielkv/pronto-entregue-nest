import {
	Column,
	Entity,
	Index,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
} from "typeorm";
import { Company } from "../company/entities/company.entity";

@Index("companyId", ["companyId"], {})
@Entity("view_areas")
export class ViewArea {
	@PrimaryGeneratedColumn({ type: "int", name: "id" })
	id: number;

	@Column("varchar", { name: "name", nullable: true, length: 255 })
	name: string | null;

	@Column("point", { name: "center" })
	center: string;

	@Column("float", { name: "radius", precision: 12 })
	radius: number;

	@Column("datetime", { name: "createdAt" })
	createdAt: Date;

	@Column("datetime", { name: "updatedAt" })
	updatedAt: Date;

	@Column("int", { name: "companyId", nullable: true })
	companyId: number | null;

	@Column({
		type: 'boolean',
		name: "active",
		nullable: true,
		default: true,
	})
	active: boolean | null;

	@ManyToOne(() => Company, (company) => company.viewAreas, {
		onDelete: "SET NULL",
		onUpdate: "CASCADE",
	})
	@JoinColumn([{ name: "companyId", referencedColumnName: "id" }])
	company: Company;
}
