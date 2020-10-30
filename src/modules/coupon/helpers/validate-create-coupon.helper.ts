import { Injectable, NotFoundException } from '@nestjs/common';
import { Company } from 'src/modules/company-association/company/entities/company.entity';
import { ListCompaniesService } from 'src/modules/company-association/company/services/list-companies.service';
import { Product } from 'src/modules/product-association/product/entities/product.entity';
import { ListProductsService } from 'src/modules/product-association/product/services/list-products.service';
import { User } from 'src/modules/user-association/user/entities/user.entity';
import { ListUsersService } from 'src/modules/user-association/user/services/list.users.service';

@Injectable()
export class ValiteSaveCouponHelper {
    constructor(
        private listCompaniesService: ListCompaniesService,
        private listUserService: ListUsersService,
        private listProductsService: ListProductsService,
    ) {}

    async checkCompanies(companies: Company['id'][]): Promise<Company[]> {
        const companiesInstances = companies.length
            ? await this.listCompaniesService.execute({ companyId: companies })
            : [];
        if (companies.length !== companies.length)
            throw new NotFoundException('Algumas empresas restringidas não foram encontradas');

        return companiesInstances;
    }

    async checkUsers(users: User['id'][]): Promise<User[]> {
        const userInstances = users.length ? await this.listUserService.execute({ userId: users }) : [];
        if (users.length !== users.length)
            throw new NotFoundException('Alguns usuários restringidos não foram encontrados');

        return userInstances;
    }

    async checkProducts(products: Product['id'][]): Promise<Product[]> {
        const productInstances = products.length ? await this.listProductsService.execute({ productId: products }) : [];
        if (products.length !== products.length)
            throw new NotFoundException('Alguns produtos restringidos não foram encontrados');

        return productInstances;
    }
}
