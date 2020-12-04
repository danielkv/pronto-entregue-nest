import { Module } from '@nestjs/common';
import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { OptionGroupDTO } from './dtos/option.group.dto';
import { OptionGroup } from './entities/option.group.entity';

@Module({
    imports: [
        NestjsQueryGraphQLModule.forFeature({
            imports: [NestjsQueryTypeOrmModule.forFeature([OptionGroup])],
            resolvers: [
                {
                    DTOClass: OptionGroupDTO,
                    EntityClass: OptionGroup,
                    delete: { disabled: true },
                    read: { disabled: true },
                    update: { disabled: true },
                    create: { disabled: true },
                },
            ],
        }),
    ],
})
export class OptionGroupModule {}
