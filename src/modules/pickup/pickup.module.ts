import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { Module } from '@nestjs/common';
import { PickUpAreaDTO } from './dtos/pickup-area.dto';
import { PickUpAreaRepository } from './repositories/pickup-area.repository';

@Module({
    imports: [
        NestjsQueryGraphQLModule.forFeature({
            imports: [NestjsQueryTypeOrmModule.forFeature([PickUpAreaRepository])],
            resolvers: [{ DTOClass: PickUpAreaDTO, EntityClass: PickUpAreaRepository, delete: { disabled: true } }],
        }),
    ],
})
export class PickupModule {}
