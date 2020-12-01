import { User } from 'src/modules/user-association/user/entities/user.entity';

export interface AuthenticatedUser {
    userId: User['id'];
    email: User['email'];
    permissions: string[];
}
