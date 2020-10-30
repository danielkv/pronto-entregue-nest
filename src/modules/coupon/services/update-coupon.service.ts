import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { NestEventEmitter } from 'nest-event';
import { IMainEvents } from 'src/main-event-emitter/main-events.interface';

import { CouponDTO } from '../dto/coupon.dto';
import { Coupon } from '../entities/coupon.entity';
import { ValiteSaveCouponHelper } from '../helpers/validate-create-coupon.helper';
import { ICouponRepository } from '../interfaces/coupon.repository.interface';
import { IUpdateCouponEvent } from '../interfaces/update-coupon-event.interface';

@Injectable()
export class UpdateCouponService {
    constructor(
        @Inject('ICouponRepository') private couponRepository: ICouponRepository,
        private valiteSaveCouponHelper: ValiteSaveCouponHelper,
        private eventEmitter: NestEventEmitter,
    ) {}

    async execute(couponId: Coupon['id'], coupon: CouponDTO): Promise<Coupon> {
        // check if coupon exists
        const oldCoupon = await this.couponRepository.get(couponId);
        if (!oldCoupon) throw new NotFoundException('Cupom não existe');

        // check companies
        const companies = await this.valiteSaveCouponHelper.checkCompanies(coupon.companies);

        // check users
        const users = await this.valiteSaveCouponHelper.checkUsers(coupon.users);

        // check products
        const products = await this.valiteSaveCouponHelper.checkProducts(coupon.products);

        // create instance
        const couponToUpdate = this.couponRepository.create({
            id: oldCoupon.id,
            ...coupon,
            companies,
            users,
            products,
        });

        // save instance
        const updated = await this.couponRepository.save(couponToUpdate);

        // events
        const event: IUpdateCouponEvent = {
            coupon: updated,
        };
        this.eventEmitter.strictEmitter<IMainEvents>().emit('updateCoupon', event);

        // return address
        return updated;
    }
}
