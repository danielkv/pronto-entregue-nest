import { InjectQueryService, QueryService, RelationQueryService } from '@nestjs-query/core';
import { UserRepository } from '../repositories/user.reporitory';
import { User } from '../entities/user.entity';
import { Address } from 'src/modules/address/entities/address.entity';
import { AddressRepository } from 'src/modules/address/respositories/address.repository';

export class UserService extends RelationQueryService<User> {
    constructor(
        @InjectQueryService(UserRepository) queryService: QueryService<User>,
        @InjectQueryService(AddressRepository) addressQueryService: QueryService<Address>,
    ) {
        // provide the original query service so all relations defined in the ORM work
        super(queryService, {
            // specify the virtual relations
            completedSubTasks: {
                // provide the service that will be used to query the relation
                service: addressQueryService,
                // the query method accepts a todoItem that can be used to filter the relations
                query(user) {
                    // filter for all relations that belong to the todoItem and are completed
                    return { filter: { user: { eq: user.id } } };
                },
            },
        });
    }
}
