import { Injectable } from '@nestjs/common';
import { Company } from '../entities/company.entity';

@Injectable()
export class CompanyMapper {
    apply(companies: Company[], raw: any[]): Company[] {
        companies.forEach((company, index) => {
            company.isOpen = raw[index].isOpen;
            company.nextClose = raw[index].nextClose;
            company.nextOpen = raw[index].nextOpen;
            company.allowBuyClosed = raw[index].allowBuyClosed;
            company.distance = raw[index].distance;
        });

        return companies;
    }
}
