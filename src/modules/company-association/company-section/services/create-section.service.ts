import { Inject, Injectable } from '@nestjs/common';
import { NestEventEmitter } from 'nest-event';
import { IMainEvents } from 'src/main-event-emitter/main-events.interface';
import { CompanySectionDTO } from '../dtos/company-section.dto';
import { CompanySection } from '../entities/company.type.entity';
import { ICompanySectionRepository } from '../interfaces/company-section.repository.interface';
import { ICreateCompanySectionEvent } from '../interfaces/create-company-section-event.interface';

@Injectable()
export class CreateSectionService {
    constructor(
        @Inject('ICompanySectionRepository') private companySectionRepository: ICompanySectionRepository,
        private eventEmitter: NestEventEmitter,
    ) {}

    async execute(section: CompanySectionDTO): Promise<CompanySection> {
        // create instance
        const sectionInstance = this.companySectionRepository.create(section);

        // save instance
        const created = await this.companySectionRepository.save(sectionInstance);

        // events
        const event: ICreateCompanySectionEvent = {
            section: created,
        };
        this.eventEmitter.strictEmitter<IMainEvents>().emit('createSection', event);

        // return section
        return created;
    }
}
