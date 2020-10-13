import { Injectable } from '@nestjs/common';
import { IFilter } from '../../common/interfaces/IFilter';
import { QueryBuilderBase } from '../../common/repositories/query.builder.base';
import { AddressFilterDTO } from '../dtos/address.filter.dto';
import { Address } from '../entities/address.entity';

@Injectable()
export class AddressUserFilter implements IFilter<Address, AddressFilterDTO> {
    apply(
        query: QueryBuilderBase<Address, AddressFilterDTO>,
        filter?: AddressFilterDTO,
    ): QueryBuilderBase<Address, AddressFilterDTO> {
        if (!filter?.userId) return query;

        const userIds = !Array.isArray(filter.userId) ? [filter.userId] : filter.userId;

        if (!userIds.length) return query;

        // apply filter
        query
            .leftJoinAndSelect('address.users', 'user')
            .andWhere('user.id IN (:...userIds)')
            .setParameters({ userIds });

        // return query
        return query;
    }
}
