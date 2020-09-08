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
@Entity("delivery_areas", { schema: "pronto_entregue" })
export class DeliveryAreas {
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

	@Column("tinyint", {
		name: "active",
		nullable: true,
		width: 1,
		default: () => "'1'",
	})
	active: boolean | null;

	@ManyToOne(() => Companies, (companies) => companies.deliveryAreas, {
		onDelete: "SET NULL",
		onUpdate: "CASCADE",
	})
	@JoinColumn([{ name: "companyId", referencedColumnName: "id" }])
	company: Companies;
}
