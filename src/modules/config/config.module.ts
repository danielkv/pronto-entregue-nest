import { Global, Module } from '@nestjs/common';
import { ConfigRepositoryProvider } from './repositories/config.repository';
import { QueryConfigResolver } from './resolvers/query.config.resolver';
import { GetConfigService } from './services/get-config.service';
import { GetRawConfigService } from './services/get-raw-config.service';

@Global()
@Module({
    providers: [
        // services
        GetRawConfigService,
        GetConfigService,

        // resolvers
        QueryConfigResolver,

        // repositories
        ConfigRepositoryProvider,
    ],
})
export class ConfigModule {}
