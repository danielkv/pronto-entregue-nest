import {
	Column,
	Entity,
	Index,
	JoinColumn,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
} from "typeorm";
import { Category } from "../../category/category.entity";
import { CompanySection } from "./company.type.entity";
import { Address } from "../../address/address.entity";
import { CompanyMeta } from "./company.meta.entity";
import { CompanyPaymentMethod } from "./company.payment.method.entity";
import { CompanyUser } from "./company.user.entity";
import { CouponCompany } from "../../coupon/coupon.company.entity";
import { DeliveryArea } from "../../area/delivery.area.entity";
import { Order } from "../../order/order.entity";
import { Product } from "../../product/product.entity";
import { Rating } from "../../rating/rating.entity";
import { ViewArea } from "../../area/view.area.entity";

@Index("companyTypeId", ["companyTypeId"], {})
@Index("addressId", ["addressId"], {})
@Entity("companies")
export class Company {
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

	@Column({ type: 'boolean', name: "acceptTakeout", default: true })
	acceptTakeout: boolean;

	@Column({
		type: 'boolean',
		name: "active",
		nullable: true,
		default: false,
	})
	active: boolean | null;

	@Column({ type: 'boolean', name: "published", default: false })
	published: boolean;

	@Column("datetime", { name: "createdAt" })
	createdAt: Date;

	@Column("datetime", { name: "updatedAt" })
	updatedAt: Date;

	@Column("int", { name: "companyTypeId", nullable: true })
	companyTypeId: number | null;

	@Column("int", { name: "addressId", nullable: true })
	addressId: number | null;

	@OneToMany(() => Category, (categories) => categories.company)
	categories: Category[];

	@ManyToOne(() => CompanySection, (companyTypes) => companyTypes.companies, {
		onDelete: "SET NULL",
		onUpdate: "CASCADE",
	})
	@JoinColumn([{ name: "companyTypeId", referencedColumnName: "id" }])
	companyType: CompanySection;

	@ManyToOne(() => Address, (addresses) => addresses.companies, {
		onDelete: "SET NULL",
		onUpdate: "CASCADE",
	})
	@JoinColumn([{ name: "addressId", referencedColumnName: "id" }])
	address: Address;

	@OneToMany(() => CompanyMeta, (companyMetas) => companyMetas.company)
	companyMetas: CompanyMeta[];

	@OneToMany(
		() => CompanyPaymentMethod,
		(companyPaymentMethods) => companyPaymentMethods.company
	)
	companyPaymentMethods: CompanyPaymentMethod[];

	@OneToMany(() => CompanyUser, (companyUsers) => companyUsers.company)
	companyUsers: CompanyUser[];

	@OneToMany(
		() => CouponCompany,
		(couponCompanies) => couponCompanies.company
	)
	couponCompanies: CouponCompany[];

	@OneToMany(() => DeliveryArea, (deliveryAreas) => deliveryAreas.company)
	deliveryAreas: DeliveryArea[];

	@OneToMany(() => Order, (orders) => orders.company)
	orders: Order[];

	@OneToMany(() => Product, (products) => products.company)
	products: Product[];

	@OneToMany(() => Rating, (ratings) => ratings.company)
	ratings: Rating[];

	@OneToMany(() => ViewArea, (viewAreas) => viewAreas.company)
	viewAreas: ViewArea[];
}
