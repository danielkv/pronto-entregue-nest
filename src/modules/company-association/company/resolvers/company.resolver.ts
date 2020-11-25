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
        // default filters
        if (!queryArgs?.filter?.published) queryArgs.filter.published = { is: true };
        if (!queryArgs?.filter?.active) queryArgs.filter.active = { is: true };

        // default sort
        if (queryArgs?.sorting) {
            const notAllowed = ['isOpen', 'allowBuyClosed', 'nextOpen', 'nextClose', 'allowBuyClosed', 'distance'];
            //console.log(queryArgs.sorting);
            queryArgs.sorting = queryArgs.sorting.filter(sort => !notAllowed.includes(sort.field));
            //console.log(queryArgs.sorting);
        }

        return CompanyConnection.createFromPromise(
            () => this.service.findManyWithLocation(queryArgs),
            queryArgs,
            () => this.service.countWithLocation(queryArgs),
        );
    }
}
