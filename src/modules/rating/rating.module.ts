import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { Module } from '@nestjs/common';
import { RatingDTO } from './dtos/rating.dto';
import { RatingRepository } from './repositories/rating.repository';

@Module({
    imports: [
        NestjsQueryGraphQLModule.forFeature({
            imports: [NestjsQueryTypeOrmModule.forFeature([RatingRepository])],
            resolvers: [{ DTOClass: RatingDTO, EntityClass: RatingRepository, delete: { disabled: true } }],
        }),
    ],
})
export class RatingModule {}
