import { Injectable } from '@nestjs/common';
import { DeliveryStatusEnum } from '../enums/delivery.status.enum';
import { IStatusLabelsHelper } from '../interfaces/status-labels-helper.interface';
import { IStatusLabels } from '../interfaces/status-labels.interface';
import { CanceledStatus } from './status-labels/canceled-status.helper';
import { DeliveredStatus } from './status-labels/delivered-status.helper';
import { DeliveringStatus } from './status-labels/delivering-status.helper';
import { WaitingDeliveryStatus } from './status-labels/waiting-delivery-status.helper';
import { WaitingStatus } from './status-labels/waiting-status.helper';

interface ILabels {
    [key: string]: IStatusLabelsHelper;
}

@Injectable()
export class StatusLabelsHelper {
    labels: ILabels;

    constructor(
        private waitingStatus: WaitingStatus,
        private waitingDeliveryStatus: WaitingDeliveryStatus,
        private deliveringStatus: DeliveringStatus,
        private deliveredStatus: DeliveredStatus,
        private canceledStatus: CanceledStatus,
    ) {
        this.labels = {
            waiting: waitingStatus,
            waitingDelivery: waitingDeliveryStatus,
            delivering: deliveringStatus,
            delivered: deliveredStatus,
            canceled: canceledStatus,
        };
    }

    get(status: DeliveryStatusEnum): IStatusLabels {
        console.log(this.waitingDeliveryStatus);
        return this.labels[status].get();
    }
}
