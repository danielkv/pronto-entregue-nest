import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { Module } from '@nestjs/common';
import { UserMetaDTO } from './dtos/user.meta.dto';
import { UserMetaRepository } from './repositories/user.meta.reporitory';

@Module({
    imports: [
        NestjsQueryGraphQLModule.forFeature({
            imports: [NestjsQueryTypeOrmModule.forFeature([UserMetaRepository])],
            resolvers: [
                {
                    DTOClass: UserMetaDTO,
                    EntityClass: UserMetaRepository,
                    delete: { disabled: true },
                },
            ],
        }),
    ],
})
export class UserMetaModule {}
