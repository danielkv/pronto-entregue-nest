import { Module } from '@nestjs/common';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { AddressDTO } from './dtos/address.dto';
import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { AddressRepository } from './respositories/address.repository';

const nestjsQueryTypeOrmModule = NestjsQueryTypeOrmModule.forFeature([AddressRepository]);

@Module({
    imports: [
        NestjsQueryGraphQLModule.forFeature({
            imports: [nestjsQueryTypeOrmModule],
            resolvers: [
                {
                    DTOClass: AddressDTO,
                    EntityClass: AddressRepository,
                },
            ],
        }),
        nestjsQueryTypeOrmModule,
    ],
    exports: [nestjsQueryTypeOrmModule],
})
export class AddressModule {}
