import { QueryArgsType } from '@nestjs-query/query-graphql';
import { ArgsType, Field } from '@nestjs/graphql';
import { GeoPoint } from 'src/modules/common/types/geo-point';
import { CompanyDTO } from '../dtos/company.dto';
import { CompanyExtraFilterDTO } from '../dtos/company.extra-filter.dto';

@ArgsType()
export class CompanyQueryArgs extends QueryArgsType(CompanyDTO) {
    @Field(() => GeoPoint, { nullable: true })
    location: GeoPoint;

    @Field({ nullable: true })
    extraFilter: CompanyExtraFilterDTO;
}
