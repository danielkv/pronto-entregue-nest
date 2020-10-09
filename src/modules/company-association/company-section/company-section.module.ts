import { Module } from '@nestjs/common';
import { CompanySectionRepositoryProvider } from './repositories/company-section.repository';

@Module({ providers: [CompanySectionRepositoryProvider] })
export class CompanySectionModule {}
