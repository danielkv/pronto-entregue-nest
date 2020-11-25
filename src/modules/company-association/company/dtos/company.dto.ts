import { Field, ID, ObjectType } from '@nestjs/graphql';
import { IsBoolean, IsInt, IsString } from 'class-validator';
import { FilterableField, PagingStrategies, Relation } from '@nestjs-query/query-graphql';
import { AddressDTO } from 'src/modules/address/dtos/address.dto';
import { CompanyMetaDTO } from '../../company-meta/dtos/company-meta.dto';
import { CompanySectionDTO } from '../../company-section/dtos/company-section.dto';

@ObjectType('Company')
@Relation('address', () => AddressDTO, { disableRemove: true, allowFiltering: true })
@Relation('metas', () => [CompanyMetaDTO], {
    pagingStrategy: PagingStrategies.NONE,
    disableRemove: true,
})
@Relation('sections', () => [CompanySectionDTO], { allowFiltering: true })
export class CompanyDTO {
    @IsInt()
    @FilterableField(() => ID, { nullable: true })
    id!: number;

    @IsString()
    @FilterableField()
    name!: string;

    @IsString()
    @FilterableField()
    displayName: string;

    @IsString()
    @Field()
    image: string;

    @IsString()
    @Field()
    backgroundColor: string;

    @IsBoolean()
    @FilterableField()
    active: boolean;

    @IsBoolean()
    @FilterableField()
    published: boolean;

    @Field()
    isOpen?: boolean;

    @Field({ nullable: true })
    nextOpen?: Date;

    @Field()
    nextClose?: Date;

    @Field()
    allowBuyClosed?: string;

    @Field()
    distance?: number;

    /*  @FilterableField({ allowedComparisons: ['is', 'isNot'] })
    location: GeoPoint; */

    /* @IsObject()
    @Type(() => AddressDTO)
    @ValidateNested()
    @Field(() => AddressDTO)
    address: AddressDTO;

    @ValidateNested({ each: true })
    @Type(() => CompanySectionDTO)
    @Field(() => [CompanySectionDTO], { nullable: true })
    sections?: CompanySectionDTO[];

    @ValidateNested({ each: true })
    @Type(() => CompanyMetaDTO)
    @Field(() => [CompanyMetaDTO], { nullable: true })
    metas?: CompanyMetaDTO[]; */
}
