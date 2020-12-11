import { FilterableField, Relation } from '@nestjs-query/query-graphql';
import { ID, ObjectType } from '@nestjs/graphql';
import { UserDTO } from 'src/modules/user-association/user/dtos/user.dto';

@ObjectType('DeliveryMan')
@Relation('user', () => UserDTO)
export class DeliveryManDTO {
    @FilterableField(() => ID)
    id: number;

    @FilterableField(() => ID)
    userId: number;
}
