import { QueryService } from '@nestjs-query/core';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Company } from 'src/modules/company-association/company/entities/company.entity';
import { Product } from 'src/modules/product-association/product/entities/product.entity';
import { User } from 'src/modules/user-association/user/entities/user.entity';

@Injectable()
export class ValidateSaveCouponHelper {
    constructor(
        private userService: QueryService<User>,
        private companyService: QueryService<Company>,
        private productService: QueryService<Product>,
    ) {}

    async checkCompanies(companies: Company['id'][]): Promise<Company[]> {
        const companiesInstances = companies.length
            ? await this.companyService.query({ filter: { id: { in: companies } } })
            : [];
        if (companies.length !== companies.length)
            throw new NotFoundException('Algumas empresas restringidas não foram encontradas');

        return companiesInstances;
    }

    async checkUsers(users: User['id'][]): Promise<User[]> {
        const userInstances = users.length ? await this.userService.query({ filter: { id: { in: users } } }) : [];
        if (users.length !== users.length)
            throw new NotFoundException('Alguns usuários restringidos não foram encontrados');

        return userInstances;
    }

    async checkProducts(products: Product['id'][]): Promise<Product[]> {
        const productInstances = products.length
            ? await this.productService.query({ filter: { id: { in: products } } })
            : [];
        if (products.length !== products.length)
            throw new NotFoundException('Alguns produtos restringidos não foram encontrados');

        return productInstances;
    }
}
