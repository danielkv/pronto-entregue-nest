import { ObjectLike } from 'src/modules/common/interfaces/object.interface';

export interface IMailContext {
    to: string;
    from?: string;
    subject: string;
    data?: ObjectLike;
}
