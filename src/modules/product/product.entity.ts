import {
	Column,
	Entity,
	Index,
	JoinColumn,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
} from "typeorm";
import { CouponProducts } from "../coupon/coupon.product";
import { FavoriteProducts } from "./favorite.product.entity";
import { OptionsGroups } from "./option.group.entity";
import { OrderProducts } from "../order/order.product.entity";
import { Categories } from "../category/category.entity";
import { Companies } from "../company/company.entity";
import { Sales } from "./sale.entity";

@Index("categoryId", ["categoryId"], {})
@Index("companyId", ["companyId"], {})
@Entity("products", { schema: "pronto_entregue" })
export class Products {
	@PrimaryGeneratedColumn({ type: "int", name: "id" })
	id: number;

	@Column("varchar", { name: "name", nullable: true, length: 255 })
	name: string | null;

	@Column("varchar", { name: "description", nullable: true, length: 255 })
	description: string | null;

	@Column("varchar", { name: "sku", nullable: true, length: 100 })
	sku: string | null;

	@Column("text", { name: "image", nullable: true })
	image: string | null;

	@Column("tinyint", {
		name: "active",
		nullable: true,
		width: 1,
		default: () => "'1'",
	})
	active: boolean | null;

	@Column("tinyint", {
		name: "listed",
		nullable: true,
		comment: "Show the product in product list and search",
		width: 1,
		default: () => "'1'",
	})
	listed: boolean | null;

	@Column("int", { name: "order", default: () => "'0'" })
	order: number;

	@Column("enum", {
		name: "type",
		enum: ["inline", "panel"],
		default: () => "'inline'",
	})
	type: "inline" | "panel";

	@Column("decimal", {
		name: "fromPrice",
		nullable: true,
		precision: 10,
		scale: 2,
	})
	fromPrice: string | null;

	@Column("decimal", { name: "price", nullable: true, precision: 10, scale: 2 })
	price: string | null;

	@Column("datetime", { name: "createdAt" })
	createdAt: Date;

	@Column("datetime", { name: "updatedAt" })
	updatedAt: Date;

	@Column("int", { name: "categoryId", nullable: true })
	categoryId: number | null;

	@Column("int", { name: "companyId", nullable: true })
	companyId: number | null;

	@Column("int", { name: "minDeliveryTime", nullable: true })
	minDeliveryTime: number | null;

	@Column("tinyint", {
		name: "scheduleEnabled",
		nullable: true,
		width: 1,
		default: () => "'0'",
	})
	scheduleEnabled: boolean | null;

	@OneToMany(() => CouponProducts, (couponProducts) => couponProducts.product)
	couponProducts: CouponProducts[];

	@OneToMany(
		() => FavoriteProducts,
		(favoriteProducts) => favoriteProducts.product
	)
	favoriteProducts: FavoriteProducts[];

	@OneToMany(() => OptionsGroups, (optionsGroups) => optionsGroups.product)
	optionsGroups: OptionsGroups[];

	@OneToMany(() => OrderProducts, (orderProducts) => orderProducts.product)
	orderProducts: OrderProducts[];

	@OneToMany(
		() => OrderProducts,
		(orderProducts) => orderProducts.productRelated
	)
	orderProducts2: OrderProducts[];

	@ManyToOne(() => Categories, (categories) => categories.products, {
		onDelete: "SET NULL",
		onUpdate: "CASCADE",
	})
	@JoinColumn([{ name: "categoryId", referencedColumnName: "id" }])
	category: Categories;

	@ManyToOne(() => Companies, (companies) => companies.products, {
		onDelete: "SET NULL",
		onUpdate: "CASCADE",
	})
	@JoinColumn([{ name: "companyId", referencedColumnName: "id" }])
	company: Companies;

	@OneToMany(() => Sales, (sales) => sales.product)
	sales: Sales[];
}
