import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeliveryRepository } from './repositories/delivery.repository';

@Module({
    imports: [TypeOrmModule.forFeature([DeliveryRepository])],
})
export class DeliveryModule {}
