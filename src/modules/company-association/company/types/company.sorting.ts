import { SortType } from '@nestjs-query/query-graphql';
import { CompanyDTO } from '../dtos/company.dto';

export class CompanySort extends SortType(CompanyDTO) {}
