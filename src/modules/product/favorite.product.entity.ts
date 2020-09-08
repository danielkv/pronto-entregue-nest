import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Users } from "../user/user.entity";
import { Products } from "./product.entity";

@Index("productId", ["productId"], {})
@Entity("favorite_products", { schema: "pronto_entregue" })
export class FavoriteProducts {
	@Column("datetime", { name: "createdAt" })
	createdAt: Date;

	@Column("datetime", { name: "updatedAt" })
	updatedAt: Date;

	@Column("int", { primary: true, name: "userId", default: () => "'0'" })
	userId: number;

	@Column("int", { primary: true, name: "productId", default: () => "'0'" })
	productId: number;

	@ManyToOne(() => Users, (users) => users.favoriteProducts, {
		onDelete: "CASCADE",
		onUpdate: "CASCADE",
	})
	@JoinColumn([{ name: "userId", referencedColumnName: "id" }])
	user: Users;

	@ManyToOne(() => Products, (products) => products.favoriteProducts, {
		onDelete: "CASCADE",
		onUpdate: "CASCADE",
	})
	@JoinColumn([{ name: "productId", referencedColumnName: "id" }])
	product: Products;
}
