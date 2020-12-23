import { Module } from '@nestjs/common';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { AddressDTO } from './dtos/address.dto';
import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { AddressInputDTO } from './dtos/address.input.dto';
import { Address } from './entities/address.entity';

const addressQueryTypeOrmModule = NestjsQueryTypeOrmModule.forFeature([Address]);

@Module({
    imports: [
        NestjsQueryGraphQLModule.forFeature({
            imports: [addressQueryTypeOrmModule],
            resolvers: [
                {
                    DTOClass: AddressDTO,
                    EntityClass: Address,
                    UpdateDTOClass: AddressInputDTO,
                    CreateDTOClass: AddressInputDTO,
                },
            ],
        }),
        addressQueryTypeOrmModule,
    ],
    exports: [addressQueryTypeOrmModule],
})
export class AddressModule {}
