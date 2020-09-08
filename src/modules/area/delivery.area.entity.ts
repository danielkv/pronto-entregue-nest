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
@Entity("delivery_areas")
export class DeliveryArea {
	@PrimaryGeneratedColumn({ type: "int", name: "id" })
	id: number;

	@Column("varchar", { name: "name", nullable: true, length: 255 })
	name: string | null;

	@Column("point", { name: "center", nullable: true })
	center: string | null;

	@Column("float", { name: "radius", nullable: true, precision: 12 })
	radius: number | null;

	@Column("float", { name: "price", nullable: true, precision: 12 })
	price: number | null;

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

	@ManyToOne(() => Company, (company) => company.deliveryAreas, {
		onDelete: "SET NULL",
		onUpdate: "CASCADE",
	})
	@JoinColumn([{ name: "companyId", referencedColumnName: "id" }])
	company: Company;
}
