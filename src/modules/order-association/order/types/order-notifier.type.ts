import { OrderModeEnum } from '../enums/order-mode-enum';
import { INotifyOrderMode } from '../interfaces/notify-order-mode.interface';

export type OrderNotifierType = {
    [K in OrderModeEnum]?: INotifyOrderMode;
};
