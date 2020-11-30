import { SortDirection } from '@nestjs-query/core';
import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { Module } from '@nestjs/common';
import { OptionDTO } from './dtos/option.dto';
import { OptionRepository } from './repositories/option.repository';

@Module({
    imports: [
        NestjsQueryGraphQLModule.forFeature({
            imports: [NestjsQueryTypeOrmModule.forFeature([OptionRepository])],
            resolvers: [
                {
                    DTOClass: OptionDTO,
                    EntityClass: OptionRepository,
                    delete: { disabled: true },
                    read: {
                        defaultSort: [{ field: 'order', direction: SortDirection.DESC }],
                        defaultFilter: { active: { is: true }, removed: { isNot: true } },
                    },
                },
            ],
        }),
    ],
})
export class OptionModule {}
