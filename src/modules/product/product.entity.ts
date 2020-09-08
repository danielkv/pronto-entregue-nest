import {
	Column,
	Entity,
	Index,
	JoinColumn,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
} from "typeorm";
import { CouponProduct } from "../coupon/coupon.product.entity";
import { FavoriteProduct } from "./favorite.product.entity";
import { OptionGroup } from "./option.group.entity";
import { OrderProduct } from "../order/order.product.entity";
import { Category } from "../category/category.entity";
import { Company } from "../company/entities/company.entity";
import { Sale } from "./sale.entity";

@Index("categoryId", ["categoryId"], {})
@Index("companyId", ["companyId"], {})
@Entity("products")
export class Product {
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

	@Column({
		type: 'boolean',
		name: "active",
		nullable: true,
		default: true,
	})
	active: boolean | null;

	@Column({
		type: 'boolean',
		name: "listed",
		nullable: true,
		comment: "Show the product in product list and search",
		default: true,
	})
	listed: boolean | null;

	@Column("int", { name: "order", default: 0 })
	order: number;

	@Column("enum", {
		name: "type",
		enum: ["inline", "panel"],
		default: 'inline',
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

	@Column({
		type: 'boolean',
		name: "scheduleEnabled",
		nullable: true,
		default: false,
	})
	scheduleEnabled: boolean | null;

	@OneToMany(() => CouponProduct, (couponProducts) => couponProducts.product)
	couponProducts: CouponProduct[];

	@OneToMany(
		() => FavoriteProduct,
		(favoriteProducts) => favoriteProducts.product
	)
	favoriteProducts: FavoriteProduct[];

	@OneToMany(() => OptionGroup, (optionsGroups) => optionsGroups.product)
	optionsGroups: OptionGroup[];

	@OneToMany(() => OrderProduct, (orderProducts) => orderProducts.product)
	orderProducts: OrderProduct[];

	@OneToMany(
		() => OrderProduct,
		(orderProducts) => orderProducts.productRelated
	)
	orderProducts2: OrderProduct[];

	@ManyToOne(() => Category, (categories) => categories.products, {
		onDelete: "SET NULL",
		onUpdate: "CASCADE",
	})
	@JoinColumn([{ name: "categoryId", referencedColumnName: "id" }])
	category: Category;

	@ManyToOne(() => Company, (companies) => companies.products, {
		onDelete: "SET NULL",
		onUpdate: "CASCADE",
	})
	@JoinColumn([{ name: "companyId", referencedColumnName: "id" }])
	company: Company;

	@OneToMany(() => Sale, (sales) => sales.product)
	sales: Sale[];
}
