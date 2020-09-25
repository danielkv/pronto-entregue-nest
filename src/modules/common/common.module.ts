import { Module } from '@nestjs/common';
import { DateScalar } from './scalars/date-scalar';
import { GeoPointScalar } from './scalars/geo-point-scalar';

@Module({
    providers: [DateScalar, GeoPointScalar],
})
export class CommonModule {}
