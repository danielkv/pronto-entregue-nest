import { User } from 'src/modules/user-association/user/entities/user.entity';

export interface UserTokenPayload {
    userId: User['id'];
    email: User['email'];
    permissions: string[];
}
