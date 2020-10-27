import { Field, ID, InputType } from '@nestjs/graphql';
import { AddressDTO } from 'src/modules/address/dtos/address.dto';
import { IsBoolean, IsInt, IsObject, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CompanySectionDTO } from '../../company-section/dtos/company-section.dto';
import { CompanyMetaDTO } from '../../company-meta/dtos/company-meta.dto';

@InputType('CompanyInput')
export class CompanyDTO {
    @IsInt()
    @Field(() => ID, { nullable: true })
    id: number;

    @IsString()
    @Field()
    name: string;

    @IsString()
    @Field()
    displayName: string;

    @IsString()
    @Field()
    image: string;

    @IsString()
    @Field()
    backgroundColor: string;

    @IsBoolean()
    @Field({ defaultValue: true })
    active: boolean;

    @IsBoolean()
    @Field({ defaultValue: false })
    published: boolean;

    @IsObject()
    @Type(() => AddressDTO)
    @Field(() => AddressDTO)
    address: AddressDTO;

    @ValidateNested({ each: true })
    @Type(() => CompanySectionDTO)
    @Field(() => [CompanySectionDTO], { nullable: true })
    sections?: CompanySectionDTO[];

    @ValidateNested({ each: true })
    @Type(() => CompanyMetaDTO)
    @Field(() => [CompanyMetaDTO], { nullable: true })
    metas?: CompanyMetaDTO[];
}
