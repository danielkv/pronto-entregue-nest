import { FilterableField, Relation } from '@nestjs-query/query-graphql';
import { Field, ObjectType } from '@nestjs/graphql';
import { AppRoles } from 'src/modules/auth/enums/app-roles.enum';
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

    @Field(() => [AppRoles])
    permissions: AppRoles[];
}
