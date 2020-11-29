import { FilterableField, Relation } from '@nestjs-query/query-graphql';
import { ObjectType } from '@nestjs/graphql';
import { UserDTO } from 'src/modules/user-association/user/dtos/user.dto';

@ObjectType('CompanyUser')
@Relation('user', () => UserDTO)
export class CompanyUserDTO {
    @FilterableField()
    active: boolean;

    @FilterableField()
    companyId: number;

    @FilterableField()
    userId: number;

    @FilterableField()
    permissions: string[];
}
