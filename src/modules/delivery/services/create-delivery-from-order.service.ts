import { InjectQueryService, QueryService } from '@nestjs-query/core';
import { NotFoundException } from '@nestjs/common';
import { Address } from 'src/modules/address/entities/address.entity';
import { AddressHelper } from 'src/modules/common/helpers/address.helper';
import { CompanyRepository } from 'src/modules/company-association/company/repositories/company.repository';
import { CompanyService } from 'src/modules/company-association/company/services/company.service';
import { Order } from 'src/modules/order-association/order/entities/order.entity';
import { UserMeta } from 'src/modules/user-association/user-meta/entities/user.meta.entity';
import { User } from 'src/modules/user-association/user/entities/user.entity';
import { UserService } from 'src/modules/user-association/user/services/user.service';
import { Delivery } from '../entities/delivery.entity';
import { DeliveryStatusEnum } from '../enums/delivery.status.enum';
import { DeliveryService } from './delivery.service';

export class CreateDeliveryFromOrderService {
    constructor(
        private addressHelper: AddressHelper<Order>,
        private deliveryService: DeliveryService,
        @InjectQueryService(UserMeta) private userMetaService: QueryService<UserMeta>,
        @InjectQueryService(User) private userService: UserService,
        @InjectQueryService(CompanyRepository) private companyService: CompanyService,
        @InjectQueryService(Address) private addressService: QueryService<Address>,
    ) {}

    async execute(order: Order): Promise<Delivery> {
        // find company data
        const company = await this.companyService.findById(order.companyId);
        if (!company) throw new NotFoundException('Empresa não encontrada');

        // find company address data
        const companyAddress = await this.addressService.findById(company.addressId);
        if (!companyAddress) throw new NotFoundException('Endereço da empresa não encontrado');

        // find user data
        const user = await this.userService.findById(order.userId);
        if (!user) throw new NotFoundException('Usuário não encontrado');

        // find user contact
        let [{ value: userContact }] = await this.userMetaService.query({ filter: { key: { eq: 'phone' } } });
        if (!userContact) userContact = '';

        // create new delivery data
        const newDelivery = {
            addressFrom: companyAddress,
            addressTo: this.addressHelper.split(order),
            description: `Pedido #${order.id} de ${company.displayName}`,
            value: order.deliveryPrice,
            receiverName: `${user.firstName} ${user.lastName}`,
            receiverContact: userContact,
            senderContact: '',
            status: DeliveryStatusEnum.WAITING,
            orderId: order.id,
        };

        // create delivery
        const delivery = this.deliveryService.createOne(newDelivery);

        // return data
        return delivery;
    }
}
