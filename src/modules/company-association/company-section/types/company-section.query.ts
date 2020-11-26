import { CursorQueryArgsType } from '@nestjs-query/query-graphql';
import { ArgsType, Field } from '@nestjs/graphql';
import { CompanySectionDTO } from '../dtos/company-section.dto';
import { CompanySectionExtraFilterDTO } from '../dtos/company-section.filter.dto';

@ArgsType()
export class CompanySectionQueryArgs extends CursorQueryArgsType(CompanySectionDTO, {
    defaultFilter: { active: { is: true } },
}) {
    @Field({ nullable: true })
    extraFilter: CompanySectionExtraFilterDTO;
}
