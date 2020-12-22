import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { Module } from '@nestjs/common';
import { BusinessHourDTO } from './dtos/business-hour.dto';
import { BusinessHour } from './entities/business-hour.entity';

const businessHourTypeOrmModule = NestjsQueryTypeOrmModule.forFeature([BusinessHour]);

@Module({
    imports: [
        NestjsQueryGraphQLModule.forFeature({
            imports: [businessHourTypeOrmModule],
            resolvers: [
                {
                    DTOClass: BusinessHourDTO,
                    EntityClass: BusinessHour,
                    delete: { disabled: true },
                },
            ],
        }),
    ],
})
export class BusinessHourModule {}
