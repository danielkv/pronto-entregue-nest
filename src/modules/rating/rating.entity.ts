import {
	Column,
	Entity,
	Index,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
} from "typeorm";
import { Companies } from "../company/company.entity";
import { Orders } from "../order/order.entity";
import { Users } from "../user/user.entity";

@Index("companyId", ["companyId"], {})
@Index("orderId", ["orderId"], {})
@Index("userId", ["userId"], {})
@Entity("ratings", { schema: "pronto_entregue" })
export class Ratings {
	@PrimaryGeneratedColumn({ type: "int", name: "id" })
	id: number;

	@Column("int", { name: "rate", nullable: true })
	rate: number | null;

	@Column("text", { name: "comment", nullable: true })
	comment: string | null;

	@Column("tinyint", {
		name: "hidden",
		nullable: true,
		width: 1,
		default: () => "'1'",
	})
	hidden: boolean | null;

	@Column("datetime", { name: "createdAt" })
	createdAt: Date;

	@Column("datetime", { name: "updatedAt" })
	updatedAt: Date;

	@Column("int", { name: "companyId", nullable: true })
	companyId: number | null;

	@Column("int", { name: "orderId", nullable: true })
	orderId: number | null;

	@Column("int", { name: "userId", nullable: true })
	userId: number | null;

	@ManyToOne(() => Companies, (companies) => companies.ratings, {
		onDelete: "SET NULL",
		onUpdate: "CASCADE",
	})
	@JoinColumn([{ name: "companyId", referencedColumnName: "id" }])
	company: Companies;

	@ManyToOne(() => Orders, (orders) => orders.ratings, {
		onDelete: "SET NULL",
		onUpdate: "CASCADE",
	})
	@JoinColumn([{ name: "orderId", referencedColumnName: "id" }])
	order: Orders;

	@ManyToOne(() => Users, (users) => users.ratings, {
		onDelete: "SET NULL",
		onUpdate: "CASCADE",
	})
	@JoinColumn([{ name: "userId", referencedColumnName: "id" }])
	user: Users;
}
