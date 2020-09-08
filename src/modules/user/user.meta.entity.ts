import {
	Column,
	Entity,
	Index,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
} from "typeorm";
import { Users } from "./user.entity";

@Index("userId", ["userId"], {})
@Entity("user_metas", { schema: "pronto_entregue" })
export class UserMetas {
	@PrimaryGeneratedColumn({ type: "int", name: "id" })
	id: number;

	@Column("varchar", {
		name: "key",
		nullable: true,
		comment: "phone | email | document | address | ...",
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

	@Column("int", { name: "userId", nullable: true })
	userId: number | null;

	@ManyToOne(() => Users, (users) => users.userMetas, {
		onDelete: "SET NULL",
		onUpdate: "CASCADE",
	})
	@JoinColumn([{ name: "userId", referencedColumnName: "id" }])
	user: Users;
}
