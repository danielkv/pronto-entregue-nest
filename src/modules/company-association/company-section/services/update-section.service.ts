import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { NestEventEmitter } from 'nest-event';
import { IMainEvents } from '../../../../main-event-emitter/main-events.interface';
import { CompanySectionDTO } from '../dtos/company-section.dto';
import { CompanySection } from '../entities/company.type.entity';
import { ICompanySectionRepository } from '../interfaces/company-section.repository.interface';
import { IUpdateCompanySectionEvent } from '../interfaces/update-company-section-event.interface';

@Injectable()
export class CreateSectionService {
    constructor(
        @Inject('ICompanySectionRepository') private companySectionRepository: ICompanySectionRepository,
        private eventEmitter: NestEventEmitter,
    ) {}

    async execute(sectionId: CompanySection['id'], section: CompanySectionDTO): Promise<CompanySection> {
        // check if exists
        const oldSection = await this.companySectionRepository.get(sectionId);
        if (!oldSection) throw new NotFoundException('Seção não existe');

        // merge data
        const mergedInstance = this.companySectionRepository.merge(oldSection, section);

        // save instance
        const updated = await this.companySectionRepository.save(mergedInstance);

        // events
        const event: IUpdateCompanySectionEvent = {
            section: updated,
        };
        this.eventEmitter.strictEmitter<IMainEvents>().emit('updateSection', event);

        // return section
        return updated;
    }
}
