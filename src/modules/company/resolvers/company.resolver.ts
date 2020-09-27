import { Query } from '@nestjs/graphql';
import { Resolver } from '@nestjs/graphql';
import { CompanyService } from '../company.service';
import { Company } from '../entities/company.entity';

@Resolver()
export class CompanyResolver {
    constructor(private companyService: CompanyService) {}

    @Query(() => [Company])
    companies() {
        return this.companyService.findAll();
    }
}
