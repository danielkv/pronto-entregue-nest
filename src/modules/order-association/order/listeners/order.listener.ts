import { InjectQueryService, QueryService } from '@nestjs-query/core';
import { Injectable } from '@nestjs/common';
import { On } from 'nest-event';
import { Company } from 'src/modules/company-association/company/entities/company.entity';
import { CompanyRepository } from 'src/modules/company-association/company/repositories/company.repository';
import { ICreateOrderEvent } from '../interfaces/create-order-event.interface';
import { NotifyNewOrderService } from '../services/notify-new-order.service';

@Injectable()
export class OrderListener {
    constructor(
        private notifyNewOrderService: NotifyNewOrderService,
        @InjectQueryService(CompanyRepository) private companyService: QueryService<Company>,
    ) {}

    @On('createOrder')
    async onCreateOrder({ order }: ICreateOrderEvent) {
        // select company
        const company = await this.companyService.findById(order.companyId);

        return this.notifyNewOrderService.execute(order, company);
    }
}
