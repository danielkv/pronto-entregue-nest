import { ConnectionType } from '@nestjs-query/query-graphql';
import { Resolver, Query, Args, ID } from '@nestjs/graphql';
import { GeoPoint } from 'src/modules/common/types/geo-point';
import { CompanyDTO } from '../dtos/company.dto';
import { Company } from '../entities/company.entity';
import { CompanyService } from '../services/company.service';
import { CompanyQueryArgs } from '../types/company.query';
import { CompanyConnection } from '../types/company.connection';

@Resolver(() => CompanyDTO)
export class CompanyQueryResolver {
    constructor(private readonly service: CompanyService) {}

    @Query(() => CompanyDTO, { name: 'company' })
    company(
        @Args({ name: 'id', type: () => ID }) id: Company['id'],
        @Args({ name: 'location', type: () => GeoPoint, nullable: true }) location?: GeoPoint,
    ): Promise<CompanyDTO> {
        return this.service.findByIdWithLocation(id, location);
    }

    @Query(() => CompanyConnection, { name: 'companies' })
    companies(@Args() queryArgs: CompanyQueryArgs): Promise<ConnectionType<CompanyDTO>> {
        return CompanyConnection.createFromPromise(
            () => this.service.findManyWithLocation(queryArgs),
            queryArgs,
            () => this.service.countWithLocation(queryArgs),
        );
    }
}
