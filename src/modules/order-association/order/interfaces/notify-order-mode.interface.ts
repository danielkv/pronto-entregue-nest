import { Company } from 'src/modules/company-association/company/entities/company.entity';
import { Order } from '../entities/order.entity';

export interface INotifyOrderMode {
    send(order: Order, company: Company): any;
}
