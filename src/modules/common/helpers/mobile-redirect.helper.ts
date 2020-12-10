import { Injectable } from '@nestjs/common';
import { ObjectLike } from '../interfaces/object.interface';
import { IRedirectScreen } from '../interfaces/redirect-screen.interface';
import { MobileScreenEnum } from './enums/mobile-pages.enum';

interface IScreens {
    [key: string]: IRedirectScreen;
}

@Injectable()
export class MobileScreenHelper {
    readonly screens: IScreens = {
        splashLogin: { name: 'SplashLoginScreen', params: {} },
        login: { name: 'LoginScreen', params: {} },
        subscription: { name: 'SubscriptionScreen', params: {} },
        forgotPassword: { name: 'ForgotPasswordScreen', params: {} },

        feed: { name: 'FeedScreen', params: {} },
        search: { name: 'SearchScreen', params: {} },
        sectionCompanies: { name: 'SectionCompaniesScreen', params: {} },
        company: { name: 'CompanyScreen', params: {} },
        product: { name: 'ProductScreen', params: {} },
        suggestCompany: { name: 'SuggestCompany', params: {} },

        profile: { name: 'ProfileScreen', params: {} },
        favoriteProduct: {
            name: 'ProfileTabsScreen',
            params: { screen: 'FavoriteProductsScreen' },
        },
        creditHistory: {
            name: 'ProfileTabsScreen',
            params: { screen: 'CreditHistory' },
        },

        companyOrders: { name: 'OrdersRollScreen', params: {} },
        deliveries: { name: 'DeliveriesScreen', params: {} },
        listDeliveries: { name: 'ListDeliveriesScreen', params: {} },

        cart: { name: 'CartScreen', params: {} },
        orderList: { name: 'OrderListScreen', params: {} },
        order: { name: 'OrderScreen', params: {} },

        selectAddress: { name: 'SelectAddressScreen', params: {} },
        newAddress: { name: 'NewAddressScreen', params: {} },
        map: { name: 'MapScreen', params: {} },
        typeAddress: { name: 'TypeAddressScreen', params: {} },
    };

    find(screenName: MobileScreenEnum, params?: ObjectLike) {
        const screen = this.screens[screenName];
        if (!screenName) throw new Error('Não há nenhuma tela com esse nome');

        if (params) screen.params = { ...screen.params, ...params };

        return screen;
    }
}
