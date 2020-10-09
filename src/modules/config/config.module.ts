import { Module } from '@nestjs/common';
import { ConfigRepositoryProvider } from './repositories/config.repository';
import { QueryConfigResolver } from './resolvers/query.config.resolver';
import { GetConfigService } from './services/get.config.service';

@Module({
	providers: [
		//services
		GetConfigService,
		QueryConfigResolver, 

		// repositories
		ConfigRepositoryProvider
	],
})
export class ConfigModule {}
