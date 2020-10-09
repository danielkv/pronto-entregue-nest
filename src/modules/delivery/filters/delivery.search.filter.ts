import { IFilter } from '../../common/interfaces/IFilter';
import { Brackets } from 'typeorm';
import { QueryBuilderBase } from '../../common/repositories/query.builder.base';
import { Delivery } from '../entities/delivery.entity';
import { DeliveryFilterDTO } from '../dtos/delivery.filter.dto';

export class DeliverySearchFilter implements IFilter<Delivery, DeliveryFilterDTO> {
    apply(
        query: QueryBuilderBase<Delivery, DeliveryFilterDTO>,
        filter?: any,
    ): QueryBuilderBase<Delivery, DeliveryFilterDTO> {
        if (!filter?.search) return query;

        return query.andWhere(
            new Brackets(qb =>
                qb
                    .where('delivery.name LIKE :search', {
                        search: `%${filter.search}%`,
                    })
                    .orWhere('delivery.description LIKE :search', {
                        search: `%${filter.search}%`,
                    })
                    .orWhere('delivery.receiverName LIKE :search', {
                        search: `%${filter.search}%`,
                    })
                    .orWhere('delivery.receiverContact LIKE :search', {
                        search: `%${filter.search}%`,
                    }),
            ),
        );
    }
}
