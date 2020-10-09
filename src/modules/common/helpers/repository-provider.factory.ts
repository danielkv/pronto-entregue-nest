import { FactoryProvider } from "@nestjs/common";
import { Connection, ObjectType } from "typeorm";


export class RepositoryProviderFactory<Entity> {
	constructor(private name:string, private repository: ObjectType<Entity>) {}

	create():FactoryProvider<Entity> {
		return {
			provide: this.name,
			useFactory: (connection: Connection) => connection.getCustomRepository(this.repository),
			inject: [Connection],
		}
	}
}