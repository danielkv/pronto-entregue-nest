import { IUpdateUserInterface } from 'src/modules/user-association/user/interface/update-user-event.interface';
import { ICreateUserInterface } from '../modules/user-association/user/interface/create-user-event.interface';

export interface IMainEvents {
    createUser(event: ICreateUserInterface): void;
    updateUser(event: IUpdateUserInterface): void;
}
