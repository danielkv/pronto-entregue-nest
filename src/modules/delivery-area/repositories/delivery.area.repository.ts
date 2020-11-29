import { RepositoryBase } from '../../common/repositories/repository.base';
import { Brackets, EntityRepository } from 'typeorm';
import { DeliveryArea } from '../entities/delivery.area.entity';
import { GeoPoint } from '../../common/types/geo-point';

@EntityRepository(DeliveryArea)
export class DeliveryAreaRepository extends RepositoryBase<DeliveryArea> {
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
