import {
	Column,
	Entity,
	Index,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
} from "typeorm";
import { Product } from "./product.entity";

@Index("productId", ["productId"], {})
@Entity("sales")
export class Sale {
	@PrimaryGeneratedColumn({ type: "int", name: "id" })
	id: number;

	@Column("decimal", { name: "price", precision: 10, scale: 2 })
	price: string;

	@Column("datetime", { name: "startsAt", nullable: true })
	startsAt: Date | null;

	@Column("datetime", { name: "expiresAt", nullable: true })
	expiresAt: Date | null;

	@Column({ type: 'boolean', name: "active", default: true })
	active: boolean;

	@Column({ type: 'boolean', name: "removed", default: false })
	removed: boolean;

	@Column("datetime", { name: "createdAt" })
	createdAt: Date;

	@Column("datetime", { name: "updatedAt" })
	updatedAt: Date;

	@Column("int", { name: "productId", nullable: true })
	productId: number | null;

	@ManyToOne(() => Product, (products) => products.sales, {
		onDelete: "SET NULL",
		onUpdate: "CASCADE",
	})
	@JoinColumn([{ name: "productId", referencedColumnName: "id" }])
	product: Product;
}
