import { Module } from '@nestjs/common';
import { OptionGroupRepository } from './repositories/option-group.repository';
import { SortDirection } from '@nestjs-query/core';
import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { OptionGroupDTO } from './dtos/option.group.dto';

@Module({
    imports: [
        NestjsQueryGraphQLModule.forFeature({
            imports: [NestjsQueryTypeOrmModule.forFeature([OptionGroupRepository])],
            resolvers: [
                {
                    DTOClass: OptionGroupDTO,
                    EntityClass: OptionGroupRepository,
                    delete: { disabled: true },
                    read: { defaultSort: [{ field: 'order', direction: SortDirection.DESC }] },
                },
            ],
        }),
    ],
})
export class OptionGroupModule {}
