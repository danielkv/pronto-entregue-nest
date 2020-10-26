import { User } from '../entities/user.entity';

export interface ICreateUserEvent {
    user: User;
}
