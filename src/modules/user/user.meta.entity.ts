import {
	Column,
	Entity,
	Index,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./user.entity";

@Index("userId", ["userId"], {})
@Entity("user_metas")
export class UserMeta {
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

	@Column("int", { name: "userId", nullable: true })
	userId: number | null;

	@ManyToOne(() => User, (users) => users.userMetas, {
		onDelete: "SET NULL",
		onUpdate: "CASCADE",
	})
	@JoinColumn([{ name: "userId", referencedColumnName: "id" }])
	user: User;
}
