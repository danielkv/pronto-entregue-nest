import { QueryService } from '@nestjs-query/core';
import { TypeOrmQueryService } from '@nestjs-query/query-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CompanySectionDTO } from '../dtos/company-section.dto';
import { CompanySection } from '../entities/company.type.entity';
import { CompanySectionRepository } from '../repositories/company-section.repository';
import { CompanySectionQueryArgs } from '../types/company-section.query';
import { TodoItemEntity } from './todo-item.entity';

@QueryService(CompanySectionDTO)
export class CompanySectionService extends TypeOrmQueryService<CompanySection> {
    constructor(private companySectionRepository: CompanySectionRepository) {
        super(companySectionRepository);
    }

    async query(query: CompanySectionQueryArgs): Promise<CompanySection[]> {
        const qb = this.filterQueryBuilder.select(query);

        return updatedCount;
    }
}
