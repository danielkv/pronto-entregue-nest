import { RepositoryBase } from '../../common/repositories/repository.base';
import { Brackets, EntityRepository } from 'typeorm';
import { DeliveryArea } from '../entities/delivery.area.entity';
import { DeliveryAreaFilterDTO } from '../dtos/delivery.area.filter.dto';
import { DeliveryAreaLocationFilter } from '../filters/delivery.area.location.filter';
import { DeliveryAreaCompaniesFilter } from '../filters/delivery.area.companies.filter';
import { DeliveryAreaActiveFilter } from '../filters/delivery.area.active.filter';
import { GeoPoint } from 'src/modules/common/types/geo-point';
import { IDeliveryAreaRepository } from '../interfaces/delivery-area.repository.interface';
import { RepositoryProviderFactory } from 'src/modules/common/helpers/repository-provider.factory';

@EntityRepository(DeliveryArea)
export class DeliveryAreaRepository extends RepositoryBase<DeliveryArea, DeliveryAreaFilterDTO>
    implements IDeliveryAreaRepository {
    constructor() {
        super();

        this.setFilters([
            new DeliveryAreaLocationFilter(),
            new DeliveryAreaCompaniesFilter(),
            new DeliveryAreaActiveFilter(),
        ]);
    }

    filterCompanyAndLocation(companyId: number, location: GeoPoint): Promise<DeliveryArea[]>;
    filterCompanyAndLocation(companyId: number[], location: GeoPoint[]): Promise<DeliveryArea[]>;
    filterCompanyAndLocation(companyId: any, location: any): Promise<DeliveryArea[]> {
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

export const DeliveryAreaRepositoryProvider = new RepositoryProviderFactory('IDeliveryAreaRepository', DeliveryAreaRepository).create();
