import { ICreateAddressEvent } from '../modules/address/interfaces/create-address-event.interface';
import { IUpdateAddressEvent } from '../modules/address/interfaces/update-address-event.interface';
import { ICreateCategoryEvent } from '../modules/category/interfaces/create-category-event.interface';
import { IUpdateCategoryEvent } from '../modules/category/interfaces/update-category-event.interface';
import { ICreateCompanyEvent } from '../modules/company-association/company/interfaces/create-company-event.interface';
import { IUpdateCompanyEvent } from '../modules/company-association/company/interfaces/update-company-event.interface';
import { IAddUserAddressEvent } from '../modules/user-association/user/interface/add-user-address-event.interface';
import { IUpdateUserAddressEvent } from '../modules/user-association/user/interface/update-user-address-event.interface';
import { IUpdateUserEvent } from '../modules/user-association/user/interface/update-user-event.interface';
import { ICreateUserEvent } from '../modules/user-association/user/interface/create-user-event.interface';
import { ICreateCompanySectionEvent } from '../modules/company-association/company-section/interfaces/create-company-section-event.interface';
import { IUpdateCompanySectionEvent } from '../modules/company-association/company-section/interfaces/update-company-section-event.interface';
import { ICreateCouponEvent } from '../modules/coupon/interfaces/create-coupon-event.interface';
import { IUpdateCouponEvent } from '../modules/coupon/interfaces/update-coupon-event.interface';
import { ICreateCreditHistoryEvent } from '../modules/credit-association/credit-history/interfaces/create-credit-history-event.interface';
import { IUpdateCreditBalanceEvent } from '../modules/credit-association/credit-balance/interfaces/update-credit-balance-event.interface';
import { ICreateProductEvent } from 'src/modules/product-association/product/interface/create-product-event.interface';
import { IUpdateProductEvent } from 'src/modules/product-association/product/interface/update-product-event.interface';
import { ICreateOrderEvent } from 'src/modules/order-association/order/interfaces/create-order-event.interface';
import { IUpdateOrderEvent } from 'src/modules/order-association/order/interfaces/update-order-event.interface';
import { IChangeOrderStatusEvent } from 'src/modules/order-association/order/interfaces/change-order-status-event.interface';
import { ICreateRatingEvent } from 'src/modules/rating/interfaces/create-rating-event.interface';
import { IUpdateRatingEvent } from 'src/modules/rating/interfaces/update-rating-event.interface';

export interface IMainEvents {
    // user
    createUser(event: ICreateUserEvent): void;
    updateUser(event: IUpdateUserEvent): void;

    // user address
    addUserAddress(event: IAddUserAddressEvent): void;
    updateUserAddress(event: IUpdateUserAddressEvent): void;

    // address
    createAddress(event: ICreateAddressEvent): void;
    updateAddress(event: IUpdateAddressEvent): void;

    // category
    createCategory(event: ICreateCategoryEvent): void;
    updateCategory(event: IUpdateCategoryEvent): void;

    // company
    createCompany(event: ICreateCompanyEvent): void;
    updateCompany(event: IUpdateCompanyEvent): void;

    // section
    createSection(event: ICreateCompanySectionEvent): void;
    updateSection(event: IUpdateCompanySectionEvent): void;

    // coupon
    createCoupon(event: ICreateCouponEvent): void;
    updateCoupon(event: IUpdateCouponEvent): void;

    // creditHistory
    createCreditHistory(event: ICreateCreditHistoryEvent): void;

    // creditBalance
    updateCreditBalance(event: IUpdateCreditBalanceEvent): void;

    // product
    createProduct(event: ICreateProductEvent): void;
    updateProduct(event: IUpdateProductEvent): void;

    // order
    createOrder(event: ICreateOrderEvent): void;
    updateOrder(event: IUpdateOrderEvent): void;
    changeOrderStatus(event: IChangeOrderStatusEvent): void;

    // rating
    createRating(event: ICreateRatingEvent): void;
    updateRating(event: IUpdateRatingEvent): void;
}
