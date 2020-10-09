import { Inject, Injectable } from '@nestjs/common';
import { GeoPoint } from 'src/modules/common/types/geo-point';
import { Company } from '../entities/company.entity';
import { ICompanyRepository } from '../interfaces/company.repository.interface';

@Injectable()
export class GetCompanyService {
    constructor(@Inject('ICompanyRepository') private companyRepository: ICompanyRepository) {}

    async execute(companyId: number[], userLocation?: GeoPoint): Promise<Company[]>;
    async execute(companyId: number, userLocation?: GeoPoint): Promise<Company>;
    async execute(companyId: any, userLocation?: GeoPoint): Promise<Company | Company[]> {
        return this.companyRepository.get(companyId, userLocation);
    }
}
