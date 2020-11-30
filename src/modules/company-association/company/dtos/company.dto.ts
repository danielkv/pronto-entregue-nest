import { Field, ID, ObjectType } from '@nestjs/graphql';
import { IsBoolean, IsInt, IsString } from 'class-validator';
import { FilterableField, PagingStrategies, Relation } from '@nestjs-query/query-graphql';
import { AddressDTO } from 'src/modules/address/dtos/address.dto';
import { CompanyMetaDTO } from '../../company-meta/dtos/company-meta.dto';
import { CompanySectionDTO } from '../../company-section/dtos/company-section.dto';
import { OrderType, OrderTypeEnum } from 'src/modules/order-association/order/enums/order.type.enum';

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

    @Field({ nullable: true })
    distance?: number;

    @Field(() => [OrderTypeEnum])
    orderType?: OrderType[];
}
