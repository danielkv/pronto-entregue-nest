import { Inject, Injectable } from '@nestjs/common';
import { NestEventEmitter } from 'nest-event';
import { IMainEvents } from 'src/main-event-emitter/main-events.interface';

import { CouponDTO } from '../dto/coupon.dto';
import { Coupon } from '../entities/coupon.entity';
import { ValiteSaveCouponHelper } from '../helpers/validate-create-coupon.helper';
import { ICouponRepository } from '../interfaces/coupon.repository.interface';
import { ICreateCouponEvent } from '../interfaces/create-coupon-event.interface';

@Injectable()
export class CreateCouponService {
    constructor(
        @Inject('ICouponRepository') private couponRepository: ICouponRepository,
        private valiteSaveCouponHelper: ValiteSaveCouponHelper,

        private eventEmitter: NestEventEmitter,
    ) {}

    async execute(coupon: CouponDTO): Promise<Coupon> {
        // check companies
        const companies = await this.valiteSaveCouponHelper.checkCompanies(coupon.companies);

        // check users
        const users = await this.valiteSaveCouponHelper.checkUsers(coupon.users);

        // check products
        const products = await this.valiteSaveCouponHelper.checkProducts(coupon.products);

        // create instance
        const couponInstance = this.couponRepository.create({
            ...coupon,
            companies,
            users,
            products,
        });

        // save instance
        const created = await this.couponRepository.save(couponInstance);

        // events
        const event: ICreateCouponEvent = {
            coupon: created,
        };
        this.eventEmitter.strictEmitter<IMainEvents>().emit('createCoupon', event);

        // return address
        return created;
    }
}
