import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { User } from "../user/user.entity";
import { Product } from "./product.entity";

@Index("productId", ["productId"], {})
@Entity("favorite_products")
export class FavoriteProduct {
	@Column("datetime", { name: "createdAt" })
	createdAt: Date;

	@Column("datetime", { name: "updatedAt" })
	updatedAt: Date;

	@Column("int", { primary: true, name: "userId", default: 0 })
	userId: number;

	@Column("int", { primary: true, name: "productId", default: 0 })
	productId: number;

	@ManyToOne(() => User, (user) => user.favoriteProducts, {
		onDelete: "CASCADE",
		onUpdate: "CASCADE",
	})
	@JoinColumn([{ name: "userId", referencedColumnName: "id" }])
	user: User;

	@ManyToOne(() => Product, (product) => product.favoriteProducts, {
		onDelete: "CASCADE",
		onUpdate: "CASCADE",
	})
	@JoinColumn([{ name: "productId", referencedColumnName: "id" }])
	product: Product;
}
