import {
	Column,
	Entity,
	Index,
	JoinColumn,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
} from "typeorm";
import { Categories } from "../category/category.entity";
import { CompanyTypes } from "./company.type.entity";
import { Addresses } from "../address/address.entity";
import { CompanyMetas } from "./company.meta.entity";
import { CompanyPaymentMethods } from "./company.payment.method";
import { CompanyUsers } from "./company.user.entity";
import { CouponCompanies } from "../coupon/coupon.company.entity";
import { DeliveryAreas } from "../area/delivery.area.entity";
import { Orders } from "../order/order.entity";
import { Products } from "../product/product.entity";
import { Ratings } from "../rating/rating.entity";
import { ViewAreas } from "../area/view.area.entity";

@Index("companyTypeId", ["companyTypeId"], {})
@Index("addressId", ["addressId"], {})
@Entity("companies", { schema: "pronto_entregue" })
export class Companies {
	@PrimaryGeneratedColumn({ type: "int", name: "id" })
	id: number;

	@Column("varchar", { name: "name", nullable: true, length: 255 })
	name: string | null;

	@Column("varchar", { name: "displayName", nullable: true, length: 255 })
	displayName: string | null;

	@Column("text", { name: "image", nullable: true })
	image: string | null;

	@Column("varchar", { name: "backgroundColor", nullable: true, length: 10 })
	backgroundColor: string | null;

	@Column("tinyint", { name: "acceptTakeout", width: 1, default: () => "'1'" })
	acceptTakeout: boolean;

	@Column("tinyint", {
		name: "active",
		nullable: true,
		width: 1,
		default: () => "'0'",
	})
	active: boolean | null;

	@Column("tinyint", { name: "published", width: 1, default: () => "'0'" })
	published: boolean;

	@Column("datetime", { name: "createdAt" })
	createdAt: Date;

	@Column("datetime", { name: "updatedAt" })
	updatedAt: Date;

	@Column("int", { name: "companyTypeId", nullable: true })
	companyTypeId: number | null;

	@Column("int", { name: "addressId", nullable: true })
	addressId: number | null;

	@OneToMany(() => Categories, (categories) => categories.company)
	categories: Categories[];

	@ManyToOne(() => CompanyTypes, (companyTypes) => companyTypes.companies, {
		onDelete: "SET NULL",
		onUpdate: "CASCADE",
	})
	@JoinColumn([{ name: "companyTypeId", referencedColumnName: "id" }])
	companyType: CompanyTypes;

	@ManyToOne(() => Addresses, (addresses) => addresses.companies, {
		onDelete: "SET NULL",
		onUpdate: "CASCADE",
	})
	@JoinColumn([{ name: "addressId", referencedColumnName: "id" }])
	address: Addresses;

	@OneToMany(() => CompanyMetas, (companyMetas) => companyMetas.company)
	companyMetas: CompanyMetas[];

	@OneToMany(
		() => CompanyPaymentMethods,
		(companyPaymentMethods) => companyPaymentMethods.company
	)
	companyPaymentMethods: CompanyPaymentMethods[];

	@OneToMany(() => CompanyUsers, (companyUsers) => companyUsers.company)
	companyUsers: CompanyUsers[];

	@OneToMany(
		() => CouponCompanies,
		(couponCompanies) => couponCompanies.company
	)
	couponCompanies: CouponCompanies[];

	@OneToMany(() => DeliveryAreas, (deliveryAreas) => deliveryAreas.company)
	deliveryAreas: DeliveryAreas[];

	@OneToMany(() => Orders, (orders) => orders.company)
	orders: Orders[];

	@OneToMany(() => Products, (products) => products.company)
	products: Products[];

	@OneToMany(() => Ratings, (ratings) => ratings.company)
	ratings: Ratings[];

	@OneToMany(() => ViewAreas, (viewAreas) => viewAreas.company)
	viewAreas: ViewAreas[];
}
