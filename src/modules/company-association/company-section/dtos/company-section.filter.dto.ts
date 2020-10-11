import { Field, ID, InputType } from '@nestjs/graphql';
import { GeoPoint } from 'src/modules/common/types/geo-point';

@InputType('CompanySectionFilterInput')
export class CompanySectionFilterDTO {
    @Field({ nullable: true })
    search?: string;

    @Field(() => GeoPoint, { nullable: true })
    location?: GeoPoint;

    @Field(() => [ID], { nullable: true })
    companyId?: number | number[];

    @Field({ nullable: true })
    onlyActive?: boolean;
}
