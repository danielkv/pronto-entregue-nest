import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { Module } from '@nestjs/common';
import { UserMetaDTO } from './dtos/user.meta.dto';
import { UserMeta } from './entities/user.meta.entity';

const userMetaTypeOrmModule = NestjsQueryTypeOrmModule.forFeature([UserMeta]);

@Module({
    imports: [
        NestjsQueryGraphQLModule.forFeature({
            imports: [userMetaTypeOrmModule],
            resolvers: [
                {
                    DTOClass: UserMetaDTO,
                    EntityClass: UserMeta,
                    delete: { disabled: true },
                },
            ],
        }),
        userMetaTypeOrmModule,
    ],
    exports: [userMetaTypeOrmModule],
})
export class UserMetaModule {}
