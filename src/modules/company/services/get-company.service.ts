import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GeoPoint } from 'src/modules/common/types/geo-point';
import { Company } from '../entities/company.entity';
import { CompanyRepository } from '../repositories/company.repository';

@Injectable()
export class GetCompanyService {
    constructor(
        @InjectRepository(CompanyRepository) private companyRepository: CompanyRepository,
    ) {}

    async execute(companyId: number[], userLocation?: GeoPoint): Promise<Company[]>;
    async execute(companyId: number, userLocation?: GeoPoint): Promise<Company>;
    async execute(companyId: any, userLocation?: GeoPoint): Promise<Company | Company[]> {
        const returnType = Array.isArray(companyId) ? 'array' : 'single';

        const query = this.companyRepository.createQueryBuilder('company');

        // apply base selection
        this.companyRepository.applyBaseSelection(query);

        // apply selection
        this.companyRepository.applyUserLocationSelection(query, userLocation);

        // apply areas selection
        this.companyRepository.applyAreasSelection(query, userLocation);

        // check companyId type
        const companyIds = !Array.isArray(companyId) ? [companyId] : companyId;

        query.where('company.id IN (:...companyIds)', { companyIds });
        query.limit(1);

        const { entities: companies, raw } = await query.getRawAndEntities();

        this.companyRepository.mapProperties(companies, raw);

        if (returnType === 'array') return companies;
        else return companies[0];
    }
}
