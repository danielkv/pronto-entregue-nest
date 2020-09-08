import {
	Column,
	Entity,
	Index,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
} from "typeorm";
import { Companies } from "../company/company.entity";
import { Users } from "../user/user.entity";
import { Roles } from "../user/role.entity";

@Index("company_users_userId_companyId_unique", ["companyId", "userId"], {
	unique: true,
})
@Index("userId", ["userId"], {})
@Index("roleId", ["roleId"], {})
@Entity("company_users", { schema: "pronto_entregue" })
export class CompanyUsers {
	@PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
	id: number;

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

	@Column("int", { name: "companyId", nullable: true })
	companyId: number | null;

	@Column("int", { name: "userId", nullable: true })
	userId: number | null;

	@Column("int", { name: "roleId", nullable: true })
	roleId: number | null;

	@ManyToOne(() => Companies, (companies) => companies.companyUsers, {
		onDelete: "CASCADE",
		onUpdate: "CASCADE",
	})
	@JoinColumn([{ name: "companyId", referencedColumnName: "id" }])
	company: Companies;

	@ManyToOne(() => Users, (users) => users.companyUsers, {
		onDelete: "CASCADE",
		onUpdate: "CASCADE",
	})
	@JoinColumn([{ name: "userId", referencedColumnName: "id" }])
	user: Users;

	@ManyToOne(() => Roles, (roles) => roles.companyUsers, {
		onDelete: "SET NULL",
		onUpdate: "CASCADE",
	})
	@JoinColumn([{ name: "roleId", referencedColumnName: "id" }])
	role: Roles;
}
