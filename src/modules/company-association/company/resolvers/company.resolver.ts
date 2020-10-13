import { Info, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { ExtractVariablePipe } from 'src/modules/common/pipes/extract-variable.pipe';
import { GeoPoint } from 'src/modules/common/types/geo-point';
import { OrderTypeEnum } from 'src/modules/order-association/order/enums/order.type.enum';
import { Company } from '../entities/company.entity';
import { GetCompanyOrderTypeService } from '../services/get-company-order-type.service';

@Resolver(() => Company)
export class CompanyResolver {
    constructor(private getCompanyOrderTypeService: GetCompanyOrderTypeService) {}

    @ResolveField(() => [OrderTypeEnum])
    orderType(
        @Parent() company: Company,
        @Info(new ExtractVariablePipe<GeoPoint>('userLocation')) userLocation: GeoPoint,
    ): OrderTypeEnum[] {
        if (!userLocation) throw new Error('Localização do usuário não definida');

        return this.getCompanyOrderTypeService.execute(company);
    }
}
