import { Args, ID, Mutation, Resolver } from '@nestjs/graphql';
import { UserInputDTO } from '../dtos/user.input.dto';
import { User } from '../entities/user.entity';
import { CreateUserService } from '../services/create-user.service';
import { UpdateUserService } from '../services/update-user.service';

@Resolver()
export class MutationUsersResolver {
    constructor(private createUserService: CreateUserService, private updateUserService: UpdateUserService) {}

    @Mutation(() => User)
    createUser(@Args('data') data: UserInputDTO): Promise<User> {
        return this.createUserService.execute(data);
    }

    @Mutation(() => User)
    updateUser(
        @Args('userId', { type: () => ID }) userId: User['id'],
        @Args('data') data: UserInputDTO,
    ): Promise<User> {
        return this.updateUserService.execute(userId, data);
    }
}
