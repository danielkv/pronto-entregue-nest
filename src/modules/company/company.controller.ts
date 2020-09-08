import { Controller, Get } from '@nestjs/common';
import { CompanyService } from './company.service';
import { Company } from './entities/company.entity';

@Controller('company')
export class CompanyController {
    constructor(private companyService: CompanyService) {}

    @Get()
    findAll(): Promise<Company[]> {
        return this.companyService.findAll();
    }
}
