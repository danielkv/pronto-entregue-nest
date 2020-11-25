import { Module } from '@nestjs/common';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { AddressDTO } from './dtos/address.dto';
import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { AddressRepository } from './respositories/address.repository';

@Module({
    imports: [
        NestjsQueryGraphQLModule.forFeature({
            imports: [NestjsQueryTypeOrmModule.forFeature([AddressRepository])],
            resolvers: [
                {
                    DTOClass: AddressDTO,
                    EntityClass: AddressRepository,
                },
            ],
        }),
    ],
})
export class AddressModule {}
