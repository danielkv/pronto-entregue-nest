import {
	Column,
	Entity,
	Index,
	OneToMany,
	PrimaryGeneratedColumn,
} from "typeorm";
import { CompanyUser } from "../company/entities/company.user.entity";
import { CouponUser } from "../coupon/coupon.user.entity";
import { CreditBalance } from "../credit/credit.balance.entity";
import { CreditHistory } from "../credit/credit.history.entity";
import { Delivery } from "../delivery/delivery.entity";
import { FavoriteProduct } from "../product/favorite.product.entity";
import { Order } from "../order/order.entity";
import { Rating } from "../rating/rating.entity";
import { UserAddress } from "./user.address.entity";
import { UserMeta } from "./user.meta.entity";

@Index("email", ["email"], { unique: true })
@Entity("users")
export class User {
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

	@Column({
		type: 'boolean',
		name: "active",
		nullable: true,
		default: true,
	})
	active: boolean | null;

	@Column("varchar", {
		name: "role",
		comment: "master | default",
		length: 255,
		default: 'default',
	})
	role: string;

	@Column("datetime", { name: "createdAt" })
	createdAt: Date;

	@Column("datetime", { name: "updatedAt" })
	updatedAt: Date;

	@OneToMany(() => CompanyUser, (companyUsers) => companyUsers.user)
	companyUsers: CompanyUser[];

	@OneToMany(() => CouponUser, (couponUsers) => couponUsers.user)
	couponUsers: CouponUser[];

	@OneToMany(() => CreditBalance, (creditBalances) => creditBalances.user)
	creditBalances: CreditBalance[];

	@OneToMany(() => CreditHistory, (creditHistory) => creditHistory.user)
	creditHistories: CreditHistory[];

	@OneToMany(() => Delivery, (deliveries) => deliveries.deliveryMan)
	deliveries: Delivery[];

	@OneToMany(
		() => FavoriteProduct,
		(favoriteProducts) => favoriteProducts.user
	)
	favoriteProducts: FavoriteProduct[];

	@OneToMany(() => Order, (orders) => orders.user)
	orders: Order[];

	@OneToMany(() => Rating, (ratings) => ratings.user)
	ratings: Rating[];

	@OneToMany(() => UserAddress, (userAddresses) => userAddresses.user)
	userAddresses: UserAddress[];

	@OneToMany(() => UserMeta, (userMetas) => userMetas.user)
	userMetas: UserMeta[];
}
