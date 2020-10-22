import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UserInputDTO } from '../dtos/user.input.dto';
import { User } from '../entities/user.entity';
import { CreateUserService } from '../services/create-user.service';

@Resolver()
export class MutationUsersResolver {
    constructor(private createUserService: CreateUserService) {}

    @Mutation(() => User)
    createUser(@Args('data') data: UserInputDTO): Promise<User> {
        return this.createUserService.execute(data);
    }
}
