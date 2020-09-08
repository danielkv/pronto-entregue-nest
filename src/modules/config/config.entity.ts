import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("config")
export class Config {
	@PrimaryGeneratedColumn({ type: "int", name: "id" })
	id: number;

	@Column("varchar", { name: "key", nullable: true, length: 255 })
	key: string | null;

	@Column("varchar", { name: "value", nullable: true, length: 255 })
	value: string | null;

	@Column("varchar", { name: "type", nullable: true, length: 255 })
	type: string | null;
}
