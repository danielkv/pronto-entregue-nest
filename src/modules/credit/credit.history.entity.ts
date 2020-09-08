import {
	Column,
	Entity,
	Index,
	JoinColumn,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "../user/user.entity";
import { Order } from "../order/order.entity";

@Index("userId", ["userId"], {})
@Entity("credit_history")
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

	@ManyToOne(() => User, (users) => users.creditHistories, {
		onDelete: "SET NULL",
		onUpdate: "CASCADE",
	})
	@JoinColumn([{ name: "userId", referencedColumnName: "id" }])
	user: User;

	@OneToMany(() => Order, (orders) => orders.creditHistory)
	orders: Order[];
}
