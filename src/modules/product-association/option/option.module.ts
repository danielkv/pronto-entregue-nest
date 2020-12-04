import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { Module } from '@nestjs/common';
import { OptionDTO } from './dtos/option.dto';
import { Option } from './entities/option.entity';

@Module({
    imports: [
        NestjsQueryGraphQLModule.forFeature({
            imports: [NestjsQueryTypeOrmModule.forFeature([Option])],
            resolvers: [
                {
                    DTOClass: OptionDTO,
                    EntityClass: Option,
                    delete: { disabled: true },
                    read: { disabled: true },
                    create: { disabled: true },
                    update: { disabled: true },
                },
            ],
        }),
    ],
})
export class OptionModule {}
