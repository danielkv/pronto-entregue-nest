import { Injectable } from '@nestjs/common';
import { NestEventEmitter } from 'nest-event';
import { IMainEvents } from 'src/main-event-emitter/main-events.interface';
import { TransactionHelper } from 'src/modules/common/helpers/transactionHelper';
import { ICompanyMetaRepository } from '../../company-meta/interfaces/company-meta.repository.interface';
import { CompanyMetaRepository } from '../../company-meta/repositories/company-meta.repository';
import { SaveCompanyMetasService } from '../../company-meta/services/save-company-metas.service';

import { CompanyDTO } from '../entities/company.dto';
import { Company } from '../entities/company.entity';

import { ICompanyRepository } from '../interfaces/company.repository.interface';
import { ICreateCompanyEvent } from '../interfaces/create-company-event.interface';
import { CompanyRepository } from '../repositories/company.repository';

@Injectable()
export class CreateCompanyService {
    constructor(private transactionHelper: TransactionHelper, private readonly eventEmitter: NestEventEmitter) {}

    async execute(company: CompanyDTO): Promise<Company> {
        const created = await this.transactionHelper.execute(async manager => {
            // get transaction repository
            const companyRepository: ICompanyRepository = manager.getCustomRepository(CompanyRepository);

            // create company instance
            const companyInstace = companyRepository.create(company);

            // create new company
            const newCompany = await companyRepository.save(companyInstace);

            // check if there are metas to save
            if (company?.metas?.length) {
                // get transaction repository and save
                const companyMetaRepository: ICompanyMetaRepository = manager.getCustomRepository(
                    CompanyMetaRepository,
                );
                const saveCompanyMetasService = new SaveCompanyMetasService(companyMetaRepository);
                await saveCompanyMetasService.execute(company.metas);
            }

            return newCompany;
        });

        // events
        const event: ICreateCompanyEvent = {
            company: created,
        };
        this.eventEmitter.strictEmitter<IMainEvents>().emit('createCompany', event);

        // return company
        return created;
    }
}
