import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { User } from "./user.entity";
import { Address } from "../address/address.entity";

@Index("addressId", ["addressId"], {})
@Entity("user_addresses")
export class UserAddress {
	@Column("datetime", { name: "createdAt" })
	createdAt: Date;

	@Column("datetime", { name: "updatedAt" })
	updatedAt: Date;

	@Column("int", { primary: true, name: "userId", default: 0 })
	userId: number;

	@Column("int", { primary: true, name: "addressId", default: 0 })
	addressId: number;

	@ManyToOne(() => User, (user) => user.userAddresses, {
		onDelete: "CASCADE",
		onUpdate: "CASCADE",
	})
	@JoinColumn([{ name: "userId", referencedColumnName: "id" }])
	user: User;

	@ManyToOne(() => Address, (address) => address.userAddresses, {
		onDelete: "CASCADE",
		onUpdate: "CASCADE",
	})
	@JoinColumn([{ name: "addressId", referencedColumnName: "id" }])
	address: Address;
}
