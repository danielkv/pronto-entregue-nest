import { Info, Query, Resolver } from '@nestjs/graphql';
import { ConfigTransformHelper } from '../../common/helpers/config.transform.helper';
import { ExtractFieldsPipe } from '../../common/pipes/extract-fields.pipe';
import { ConfigDTO, IConfigKeys } from '../dtos/config.dto';
import { GetConfigService } from '../services/get.config.service';

@Resolver()
export class QueryConfigResolver {
    constructor(
        private getConfigService: GetConfigService,
        private configTransformHelper: ConfigTransformHelper<ConfigDTO>,
    ) {}

    @Query(() => ConfigDTO)
    async configs(@Info(ExtractFieldsPipe) keys: IConfigKeys[]): Promise<ConfigDTO> {
        const metas = await this.getConfigService.execute(keys);

        const trasnformedConfigs = this.configTransformHelper.apply(metas, ConfigDTO);

        return trasnformedConfigs;
    }
}
