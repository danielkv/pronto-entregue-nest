import {
	Column,
	Entity,
	Index,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
} from "typeorm";
import { Users } from "../user/user.entity";

@Index("userId", ["userId"], {})
@Entity("credit_balances", { schema: "pronto_entregue" })
export class CreditBalances {
	@PrimaryGeneratedColumn({ type: "int", name: "id" })
	id: number;

	@Column("float", { name: "value", nullable: true, precision: 12 })
	value: number | null;

	@Column("datetime", { name: "createdAt" })
	createdAt: Date;

	@Column("datetime", { name: "updatedAt" })
	updatedAt: Date;

	@Column("int", { name: "userId", nullable: true })
	userId: number | null;

	@ManyToOne(() => Users, (users) => users.creditBalances, {
		onDelete: "SET NULL",
		onUpdate: "CASCADE",
	})
	@JoinColumn([{ name: "userId", referencedColumnName: "id" }])
	user: Users;
}
