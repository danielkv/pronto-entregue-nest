import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Users } from "./user.entity";
import { Addresses } from "../address/address.entity";

@Index("addressId", ["addressId"], {})
@Entity("user_addresses", { schema: "pronto_entregue" })
export class UserAddresses {
	@Column("datetime", { name: "createdAt" })
	createdAt: Date;

	@Column("datetime", { name: "updatedAt" })
	updatedAt: Date;

	@Column("int", { primary: true, name: "userId", default: () => "'0'" })
	userId: number;

	@Column("int", { primary: true, name: "addressId", default: () => "'0'" })
	addressId: number;

	@ManyToOne(() => Users, (users) => users.userAddresses, {
		onDelete: "CASCADE",
		onUpdate: "CASCADE",
	})
	@JoinColumn([{ name: "userId", referencedColumnName: "id" }])
	user: Users;

	@ManyToOne(() => Addresses, (addresses) => addresses.userAddresses, {
		onDelete: "CASCADE",
		onUpdate: "CASCADE",
	})
	@JoinColumn([{ name: "addressId", referencedColumnName: "id" }])
	address: Addresses;
}
