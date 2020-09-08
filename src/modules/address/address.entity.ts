import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Companies } from "../company/company.entity";
import { UserAddresses } from "../user/user.address.entity";

@Entity("addresses", { schema: "pronto_entregue" })
export class Addresses {
	@PrimaryGeneratedColumn({ type: "int", name: "id" })
	id: number;

	@Column("varchar", { name: "name", nullable: true, length: 255 })
	name: string | null;

	@Column("varchar", { name: "street", nullable: true, length: 255 })
	street: string | null;

	@Column("int", { name: "number", nullable: true })
	number: number | null;

	@Column("varchar", { name: "complement", nullable: true, length: 255 })
	complement: string | null;

	@Column("varchar", { name: "district", nullable: true, length: 255 })
	district: string | null;

	@Column("int", { name: "zipcode", nullable: true })
	zipcode: number | null;

	@Column("varchar", { name: "city", nullable: true, length: 255 })
	city: string | null;

	@Column("varchar", { name: "state", nullable: true, length: 255 })
	state: string | null;

	@Column("point", { name: "location" })
	location: string;

	@Column("datetime", { name: "createdAt" })
	createdAt: Date;

	@Column("datetime", { name: "updatedAt" })
	updatedAt: Date;

	@Column("varchar", { name: "reference", nullable: true, length: 255 })
	reference: string | null;

	@OneToMany(() => Companies, (companies) => companies.address)
	companies: Companies[];

	@OneToMany(() => UserAddresses, (userAddresses) => userAddresses.address)
	userAddresses: UserAddresses[];
}
