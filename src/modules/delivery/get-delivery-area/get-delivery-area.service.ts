import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GeoPoint } from 'src/modules/common/types/geo-point';
import { Brackets, Repository } from 'typeorm';
import { DeliveryArea } from '../entities/delivery.area.entity';

@Injectable()
export class GetDeliveryAreaService {
    constructor(
        @InjectRepository(DeliveryArea) private deliveryAreaRepository: Repository<DeliveryArea>,
    ) {}

    execute(companyId: number, location: GeoPoint): Promise<DeliveryArea[]>;
    execute(companyId: number[], location: GeoPoint[]): Promise<DeliveryArea[]>;
    execute(companyId: any, location: any): Promise<DeliveryArea[]> {
        // check companyId type
        const companyIds = !Array.isArray(companyId) ? [companyId] : companyId;

        // check companyId type
        const locations = !Array.isArray(location) ? [location] : location;

        // map args
        const search = companyIds.map((companyId, index) => ({
            companyId,
            location: locations[index],
        }));

        const query = this.deliveryAreaRepository.createQueryBuilder('deliveryArea');

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
