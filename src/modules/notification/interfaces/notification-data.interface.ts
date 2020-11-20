import { ObjectLike } from 'src/modules/common/interfaces/object.interface';

export interface INotificationData {
    title: string;
    subtitle: string;
    body: string;
    data?: ObjectLike;
}
