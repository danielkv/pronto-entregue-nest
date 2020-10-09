import { RepositoryBase } from '../../common/repositories/repository.base';
import { Brackets, EntityRepository } from 'typeorm';
import { PickUpAreaFilterDTO } from '../dtos/pickup-area.filter.dto';
import { PickUpAreaLocationFilter } from '../filters/pickup-area.location.filter';
import { PickUpAreaCompaniesFilter } from '../filters/pickup-area.companies.filter';
import { PickUpAreaActiveFilter } from '../filters/pickup-area.active.filter';
import { GeoPoint } from 'src/modules/common/types/geo-point';
import { IPickUpAreaRepository } from '../interfaces/pickup-area.repository.interface';
import { RepositoryProviderFactory } from 'src/modules/common/helpers/repository-provider.factory';
import { PickUpArea } from '../entities/pickup-area.entity';

@EntityRepository(PickUpArea)
export class PickUpAreaRepository extends RepositoryBase<PickUpArea, PickUpAreaFilterDTO>
    implements IPickUpAreaRepository {
    constructor() {
        super();

        this.setFilters([
            new PickUpAreaLocationFilter(),
            new PickUpAreaCompaniesFilter(),
            new PickUpAreaActiveFilter(),
        ]);
    }

    filterCompanyAndLocation(companyId: number, location: GeoPoint): Promise<PickUpArea[]>;
    filterCompanyAndLocation(companyId: number[], location: GeoPoint[]): Promise<PickUpArea[]>;
    filterCompanyAndLocation(companyId: any, location: any): Promise<PickUpArea[]> {
        // check companyId type
        const companyIds = !Array.isArray(companyId) ? [companyId] : companyId;

        // check companyId type
        const locations = !Array.isArray(location) ? [location] : location;

        // map args
        const search = companyIds.map((companyId, index) => ({
            companyId,
            location: locations[index],
        }));

        const query = this.createQueryBuilder('deliveryArea');

        query.where(
            new Brackets(q =>
                search.map(s =>
                    q.orWhere(
                        new Brackets(qq => {
                            const userPoint = `ST_GeomFromText('POINT(${s.location.coordinates[0]} ${s.location.coordinates[1]})')`;

                            return qq
                                .where('companyId IN (:companyId)', { companyId: s.companyId })
                                .andWhere(
                                    'ST_Distance_Sphere(:userPoint, deliveryArea.center) <= deliveryArea.radius',
                                    { userPoint },
                                );
                        }),
                    ),
                ),
            ),
        );

        return query.getMany();
    }
}

export const PickUpAreaRepositoryProvider = new RepositoryProviderFactory(
    'IPickUpAreaRepository',
    PickUpAreaRepository,
).create();
