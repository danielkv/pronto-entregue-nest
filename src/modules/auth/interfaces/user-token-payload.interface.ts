import { User } from 'src/modules/user/entities/user.entity';

export interface UserTokenPayload {
    userId: User['id'];
    email: User['email'];
    roles: string[];
}
