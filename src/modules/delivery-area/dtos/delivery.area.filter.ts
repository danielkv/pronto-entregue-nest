import { Field, ID, InputType } from '@nestjs/graphql';
import { GeoPoint } from 'src/modules/common/types/geo-point';

@InputType('DeliveryAreaFilterInput')
export class DeliveryAreaFilter {
    @Field(() => [ID], { nullable: true })
    companyId?: number | number[];

    @Field(() => GeoPoint, { nullable: true })
    location?: GeoPoint;

    @Field({ nullable: true })
    onlyActive?: boolean;
}
