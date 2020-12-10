import { IRedirectScreen } from 'src/modules/common/interfaces/redirect-screen.interface';

export interface INotificationMessage {
    title: string;
    subtitle?: string;
    body: string;
}

export interface INotificationData extends INotificationMessage {
    data?: INotificationDataParams;
}

interface INotificationDataParams {
    [key: string]: any;
    redirect?: IRedirectScreen;
    alertData?: INotificationMessage;
}
