import { Info, Query, Resolver } from '@nestjs/graphql';
import { ExtractFieldsPipe } from '../../common/pipes/extract-fields.pipe';
import { ConfigDTO, IConfigKeys } from '../dtos/config.dto';
import { GetConfigService } from '../services/get-config.service';

@Resolver()
export class QueryConfigResolver {
    constructor(private getConfigService: GetConfigService) {}

    @Query(() => ConfigDTO)
    async configs(@Info(ExtractFieldsPipe) keys: IConfigKeys[]): Promise<ConfigDTO> {
        return this.getConfigService.execute(keys);
    }
}
