import { Field, InputType } from '@nestjs/graphql';
import { GeoPoint } from 'src/modules/common/types/geo-point';

@InputType('CompanyFilterInput')
export class CompanyFilter {
    @Field({ nullable: true })
    search?: string;

    @Field(() => GeoPoint, { nullable: true })
    location?: GeoPoint;
}
