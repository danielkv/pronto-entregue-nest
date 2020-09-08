import {
	Column,
	Entity,
	Index,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
} from "typeorm";
import { Company } from "./company.entity";
import { User } from "../../user/user.entity";
import { Roles } from "../../user/role.entity";

@Index("company_users_userId_companyId_unique", ["companyId", "userId"], {
	unique: true,
})
@Index("userId", ["userId"], {})
@Index("roleId", ["roleId"], {})
@Entity("company_users")
export class CompanyUser {
	@PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
	id: number;

	@Column({
		type: 'boolean',
		name: "active",
		nullable: true,
		default: true,
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

	@ManyToOne(() => Company, (companies) => companies.companyUsers, {
		onDelete: "CASCADE",
		onUpdate: "CASCADE",
	})
	@JoinColumn([{ name: "companyId", referencedColumnName: "id" }])
	company: Company;

	@ManyToOne(() => User, (users) => users.companyUsers, {
		onDelete: "CASCADE",
		onUpdate: "CASCADE",
	})
	@JoinColumn([{ name: "userId", referencedColumnName: "id" }])
	user: User;

	@ManyToOne(() => Roles, (roles) => roles.companyUsers, {
		onDelete: "SET NULL",
		onUpdate: "CASCADE",
	})
	@JoinColumn([{ name: "roleId", referencedColumnName: "id" }])
	role: Roles;
}
