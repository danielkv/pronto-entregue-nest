import {
	Column,
	Entity,
	Index,
	JoinColumn,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
} from "typeorm";
import { Users } from "../user/user.entity";
import { Orders } from "../order/order.entity";

@Index("userId", ["userId"], {})
@Entity("credit_history", { schema: "pronto_entregue" })
export class CreditHistory {
	@PrimaryGeneratedColumn({ type: "int", name: "id" })
	id: number;

	@Column("float", { name: "value", nullable: true, precision: 12 })
	value: number | null;

	@Column("varchar", { name: "history", nullable: true, length: 255 })
	history: string | null;

	@Column("datetime", { name: "createdAt" })
	createdAt: Date;

	@Column("datetime", { name: "updatedAt" })
	updatedAt: Date;

	@Column("int", { name: "userId", nullable: true })
	userId: number | null;

	@ManyToOne(() => Users, (users) => users.creditHistories, {
		onDelete: "SET NULL",
		onUpdate: "CASCADE",
	})
	@JoinColumn([{ name: "userId", referencedColumnName: "id" }])
	user: Users;

	@OneToMany(() => Orders, (orders) => orders.creditHistory)
	orders: Orders[];
}
