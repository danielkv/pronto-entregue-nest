import { Args, Info, Query, Resolver } from '@nestjs/graphql';
import { ExtractFieldsPipe } from '../../../common/pipes/extract-fields.pipe';
import { PageInfo } from '../../../common/types/page-info';
import { UserFilterDTO } from '../dtos/user.filter.dto';
import { UserListDTO } from '../dtos/user.list.dto';
import { CountUsersService } from '../services/count.users.service';
import { ListUsersService } from '../services/list.users.service';

@Resolver()
export class QueryUsersResolver {
    constructor(private listUsersService: ListUsersService, private countUsersService: CountUsersService) {}

    @Query(() => UserListDTO)
    async listUsers(
        @Info(ExtractFieldsPipe) fields,
        @Args('filter', { type: () => UserFilterDTO, nullable: true }) filter: UserFilterDTO,
        @Args('pagination', { type: () => PageInfo, nullable: true }) pagination: PageInfo,
    ): Promise<UserListDTO> {
        const list: UserListDTO = { pageInfo: pagination };

        if (fields.includes('items')) list.items = await this.listUsersService.execute(filter, pagination);

        if (fields.includes('countItems')) list.countItems = await this.countUsersService.execute(filter);

        return list;
    }
}
