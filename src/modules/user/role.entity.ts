import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CompanyUsers } from "../company/company.user.entity";

@Entity("roles", { schema: "pronto_entregue" })
export class Roles {
	@PrimaryGeneratedColumn({ type: "int", name: "id" })
	id: number;

	@Column("varchar", { name: "name", nullable: true, length: 255 })
	name: string | null;

	@Column("varchar", { name: "displayName", nullable: true, length: 255 })
	displayName: string | null;

	@Column("text", { name: "permissions", nullable: true })
	permissions: string | null;

	@Column("datetime", { name: "createdAt" })
	createdAt: Date;

	@Column("datetime", { name: "updatedAt" })
	updatedAt: Date;

	@OneToMany(() => CompanyUsers, (companyUsers) => companyUsers.role)
	companyUsers: CompanyUsers[];
}
