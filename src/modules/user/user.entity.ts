import {
	Column,
	Entity,
	Index,
	OneToMany,
	PrimaryGeneratedColumn,
} from "typeorm";
import { CompanyUsers } from "../company/company.user.entity";
import { CouponUsers } from "../coupon/coupon.user.entity";
import { CreditBalances } from "../credit/credit.balance.entity";
import { CreditHistory } from "../credit/credit.history";
import { Deliveries } from "../delivery/delivery.entity";
import { FavoriteProducts } from "../product/favorite.product.entity";
import { Orders } from "../order/order.entity";
import { Ratings } from "../rating/rating.entity";
import { UserAddresses } from "./user.address.entity";
import { UserMetas } from "./user.meta.entity";

@Index("email", ["email"], { unique: true })
@Entity("users", { schema: "pronto_entregue" })
export class Users {
	@PrimaryGeneratedColumn({ type: "int", name: "id" })
	id: number;

	@Column("varchar", { name: "firstName", nullable: true, length: 255 })
	firstName: string | null;

	@Column("varchar", { name: "lastName", nullable: true, length: 255 })
	lastName: string | null;

	@Column("text", { name: "image", nullable: true })
	image: string | null;

	@Column("varchar", {
		name: "email",
		nullable: true,
		unique: true,
		length: 255,
	})
	email: string | null;

	@Column("varchar", { name: "password", nullable: true, length: 255 })
	password: string | null;

	@Column("varchar", { name: "salt", nullable: true, length: 255 })
	salt: string | null;

	@Column("tinyint", {
		name: "active",
		nullable: true,
		width: 1,
		default: () => "'1'",
	})
	active: boolean | null;

	@Column("varchar", {
		name: "role",
		comment: "master | default",
		length: 255,
		default: () => "'default'",
	})
	role: string;

	@Column("datetime", { name: "createdAt" })
	createdAt: Date;

	@Column("datetime", { name: "updatedAt" })
	updatedAt: Date;

	@OneToMany(() => CompanyUsers, (companyUsers) => companyUsers.user)
	companyUsers: CompanyUsers[];

	@OneToMany(() => CouponUsers, (couponUsers) => couponUsers.user)
	couponUsers: CouponUsers[];

	@OneToMany(() => CreditBalances, (creditBalances) => creditBalances.user)
	creditBalances: CreditBalances[];

	@OneToMany(() => CreditHistory, (creditHistory) => creditHistory.user)
	creditHistories: CreditHistory[];

	@OneToMany(() => Deliveries, (deliveries) => deliveries.deliveryMan)
	deliveries: Deliveries[];

	@OneToMany(
		() => FavoriteProducts,
		(favoriteProducts) => favoriteProducts.user
	)
	favoriteProducts: FavoriteProducts[];

	@OneToMany(() => Orders, (orders) => orders.user)
	orders: Orders[];

	@OneToMany(() => Ratings, (ratings) => ratings.user)
	ratings: Ratings[];

	@OneToMany(() => UserAddresses, (userAddresses) => userAddresses.user)
	userAddresses: UserAddresses[];

	@OneToMany(() => UserMetas, (userMetas) => userMetas.user)
	userMetas: UserMetas[];
}
