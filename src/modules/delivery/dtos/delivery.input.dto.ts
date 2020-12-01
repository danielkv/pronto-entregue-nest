import { Field, Float, ID, InputType } from '@nestjs/graphql';
import { DeliveryStatusEnum } from '../enums/delivery.status.enum';
import { DeliverySizesEnum } from '../enums/delivery-sizes.enum';
import { IsInt, IsNumber, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { FilterableField } from '@nestjs-query/query-graphql';
import { AddressInputDTO } from 'src/modules/address/dtos/address.input.dto';

@InputType('DeliveryInput')
export class DeliveryInputDTO {
    @IsInt()
    @FilterableField(() => ID)
    id?: number;

    @IsString()
    @FilterableField()
    description: string;

    @IsString()
    @Field()
    size: DeliverySizesEnum;

    @IsString()
    @FilterableField()
    status: DeliveryStatusEnum;

    @IsNumber()
    @Field(() => Float)
    value: number;

    @IsString()
    @FilterableField()
    receiverName: string;

    @IsString()
    @FilterableField()
    receiverContact: string;

    @IsString()
    @FilterableField()
    senderContact: string;

    @ValidateNested()
    @Type(() => AddressInputDTO)
    @Field(() => AddressInputDTO)
    addressFrom: AddressInputDTO;

    @ValidateNested()
    @Type(() => AddressInputDTO)
    @Field(() => AddressInputDTO)
    addressTo: AddressInputDTO;
}
