import { Field, InputType } from '@nestjs/graphql';
import { GeoPoint } from 'src/modules/common/types/geo-point';

@InputType('CompanySectionExtraFilter')
export class CompanySectionExtraFilterDTO {
    @Field(() => GeoPoint, { nullable: true })
    location?: GeoPoint;
}
