import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigRepository } from './repositories/config.repository';
import { QueryConfigResolver } from './resolvers/query.config.resolver';
import { GetConfigService } from './services/get.config.service';

@Module({
    imports: [TypeOrmModule.forFeature([ConfigRepository])],
    providers: [GetConfigService, QueryConfigResolver],
})
export class ConfigModule {}
