import { DeepPartial } from '@nestjs-query/core';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderInputDTO } from 'src/modules/order-association/order/dtos/order-input.dto';
import { Order } from 'src/modules/order-association/order/entities/order.entity';
import { Sale } from 'src/modules/product-association/sale/entities/sale.entity';
import { In, Raw, Repository } from 'typeorm';
import { Coupon } from '../entities/coupon.entity';

@Injectable()
export class ValidateUseCouponHelper {
    constructor(
        @InjectRepository(Coupon) private couponRepository: Repository<Coupon>,
        @InjectRepository(Sale) private saleRepository: Repository<Sale>,
        @InjectRepository(Order) private orderRepository: Repository<Order>,
    ) {}

    async validate(order: DeepPartial<OrderInputDTO>): Promise<boolean> {
        const coupon = await this.couponRepository.findOne({
            where: { id: order.couponId },
            relations: ['coupon_companies', 'coupon_products', 'coupon_users'],
        });

        // check restrictions
        this.checkRestrictions(coupon, order);

        // check product sales
        await this.checkForSales(order);

        // check rules
        await this.checkRules(coupon, order);

        return true;
    }

    private async checkRules(coupon: Coupon, order: DeepPartial<OrderInputDTO>) {
        // check minValue
        if (coupon.minValue > 0) {
            if (order.price + order.discount < coupon.minValue)
                throw new Error('O pedido não tem o valor mínimo para usar esse cupom');
        }

        // check maxValue
        if (coupon.maxValue > 0) {
            if (order.price + order.discount > coupon.maxValue)
                throw new Error('Esse cupom não é válido para pedidos nesse valor');
        }

        // check first purchase
        if (order.userId && coupon.onlyFirstPurchases) {
            const countOrders = await this.orderRepository.count({ where: { userId: order.userId } });
            if (countOrders > 0) throw new Error('Esse cupom é válido apenas para o primeiro pedido');
        }

        // check maxPurchases
        const maxPurchases = coupon.maxPurchases;
        if (maxPurchases > 0) {
            const countOrders = await this.orderRepository.count({ where: { companyId: order.couponId } });
            if (countOrders >= maxPurchases) throw new Error('Esse cupom atingiu o limite de pedidos');
        }

        // check maxPerUser
        const maxPerUser = coupon.maxPerUser;
        if (order.userId && maxPerUser > 0) {
            const countOrders = await this.orderRepository.count({
                where: { companyId: order.couponId, userId: order.userId },
            });

            if (countOrders >= maxPerUser) throw new Error('Esse cupom atingiu o limite de pedidos por usuário');
        }

        return true;
    }

    private async checkForSales(order: DeepPartial<OrderInputDTO>) {
        const productIds = order.products.map(product => product.productRelatedId);

        const sales = await this.saleRepository.find({
            where: {
                productId: In(productIds),
                startsAt: Raw(alias => `${alias} >= NOW()`),
                expiresAt: Raw(alias => `${alias} < NOW()`),
                active: true,
            },
        });

        if (sales?.length)
            throw new Error(
                'Existem produtos em promoção na cesta. Esse cupom não é aplicável em produtos na promoção.',
            );

        return true;
    }

    private checkRestrictions(coupon: Coupon, order: DeepPartial<OrderInputDTO>) {
        // check companies
        if (coupon?.companies?.length && !coupon.companies.map(company => company.id).includes(order.companyId))
            throw new ForbiddenException('Esse cupom não é aplicável à esse estabelecimento');

        // check products
        if (coupon?.products?.length) {
            const productIds = order.products.map(prod => prod.productRelatedId);
            const invalid = coupon.products.find(product => !productIds.includes(product.id));
            if (invalid) throw new ForbiddenException(`Esse cupom não é aplicável ao item ${invalid.name} da cesta`);
        }

        // check user
        if (coupon?.users?.length && !coupon.users.map(user => user.id).includes(order.userId))
            throw new ForbiddenException('Esse cupom não é aplicável à esse usuário');

        return true;
    }
}
