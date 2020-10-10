import { Inject, Injectable } from '@nestjs/common';
import { ConfigTransformHelper } from 'src/modules/common/helpers/config.transform.helper';
import { ConfigDTO, IConfigKeys } from '../dtos/config.dto';
import { IConfigRepository } from '../interfaces/config.repository.interface';

@Injectable()
export class GetConfigService {
    constructor(
        @Inject('IConfigRepository') private configRepository: IConfigRepository,
        private configTransformHelper: ConfigTransformHelper<ConfigDTO>,
    ) {}

    async execute(keys: IConfigKeys): Promise<ConfigDTO[IConfigKeys]>;
    async execute(keys: IConfigKeys[]): Promise<ConfigDTO>;
    async execute(keys: any): Promise<ConfigDTO | ConfigDTO[IConfigKeys]> {
        if (Array.isArray(keys)) {
            const metas = await this.configRepository.getMany(keys);
            return this.configTransformHelper.apply(metas, ConfigDTO);
        }

        return this.configRepository.getOne(keys);
    }
}
