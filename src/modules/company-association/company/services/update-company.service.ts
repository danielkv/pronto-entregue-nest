import { Injectable, NotFoundException } from '@nestjs/common';
import { NestEventEmitter } from 'nest-event';
import { IMainEvents } from 'src/main-event-emitter/main-events.interface';
import { TransactionHelper } from 'src/modules/common/helpers/transactionHelper';
import { ICompanyMetaRepository } from '../../company-meta/interfaces/company-meta.repository.interface';
import { CompanyMetaRepository } from '../../company-meta/repositories/company-meta.repository';
import { SaveCompanyMetasService } from '../../company-meta/services/save-company-metas.service';

import { CompanyDTO } from '../entities/company.dto';
import { Company } from '../entities/company.entity';

import { ICompanyRepository } from '../interfaces/company.repository.interface';
import { IUpdateCompanyEvent } from '../interfaces/update-company-event.interface';
import { CompanyRepository } from '../repositories/company.repository';

@Injectable()
export class UpdateCompanyService {
    constructor(private transactionHelper: TransactionHelper, private readonly eventEmitter: NestEventEmitter) {}

    async execute(companyId: Company['id'], company: CompanyDTO): Promise<Company> {
        const updated = await this.transactionHelper.execute(async manager => {
            // get transaction repository
            const companyRepository: ICompanyRepository = manager.getCustomRepository(CompanyRepository);

            // check if company exists
            const oldCompany = await companyRepository.get(companyId);
            if (!oldCompany) throw new NotFoundException('Empresa não existe');

            // merge data
            const mergedCompany = companyRepository.merge(oldCompany, company);

            // create new company
            const updatedCompany = await companyRepository.save(mergedCompany);

            // check if there are metas to save
            if (company?.metas?.length) {
                // get transaction repository and save
                const companyMetaRepository: ICompanyMetaRepository = manager.getCustomRepository(
                    CompanyMetaRepository,
                );
                const saveCompanyMetasService = new SaveCompanyMetasService(companyMetaRepository);
                await saveCompanyMetasService.execute(company.metas);
            }

            return updatedCompany;
        });

        // events
        const event: IUpdateCompanyEvent = {
            company: updated,
        };
        this.eventEmitter.strictEmitter<IMainEvents>().emit('updateCompany', event);

        // return company
        return updated;
    }
}
