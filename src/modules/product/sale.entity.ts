import {
	Column,
	Entity,
	Index,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
} from "typeorm";
import { Products } from "./product.entity";

@Index("productId", ["productId"], {})
@Entity("sales", { schema: "pronto_entregue" })
export class Sales {
	@PrimaryGeneratedColumn({ type: "int", name: "id" })
	id: number;

	@Column("decimal", { name: "price", precision: 10, scale: 2 })
	price: string;

	@Column("datetime", { name: "startsAt", nullable: true })
	startsAt: Date | null;

	@Column("datetime", { name: "expiresAt", nullable: true })
	expiresAt: Date | null;

	@Column("tinyint", { name: "active", width: 1, default: () => "'1'" })
	active: boolean;

	@Column("tinyint", { name: "removed", width: 1, default: () => "'0'" })
	removed: boolean;

	@Column("datetime", { name: "createdAt" })
	createdAt: Date;

	@Column("datetime", { name: "updatedAt" })
	updatedAt: Date;

	@Column("int", { name: "productId", nullable: true })
	productId: number | null;

	@ManyToOne(() => Products, (products) => products.sales, {
		onDelete: "SET NULL",
		onUpdate: "CASCADE",
	})
	@JoinColumn([{ name: "productId", referencedColumnName: "id" }])
	product: Products;
}
