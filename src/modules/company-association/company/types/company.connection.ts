import { ConnectionType } from '@nestjs-query/query-graphql';
import { CompanyDTO } from '../dtos/company.dto';

export const CompanyConnection = ConnectionType(CompanyDTO);
