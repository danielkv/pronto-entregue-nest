import { User } from 'src/modules/user-association/user/entities/user.entity';
import { AppRoles } from '../enums/app-roles.enum';

export interface AuthenticatedUser {
    userId: User['id'];
    email: User['email'];
    permissions: AppRoles[];
}
