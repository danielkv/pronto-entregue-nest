import { ConfigTransformHelper } from 'src/modules/common/helpers/config.transform.helper';
import { RepositoryBase } from 'src/modules/common/repositories/repository.base';
import { EntityRepository } from 'typeorm';
import { ConfigDTO, IConfigKeys } from '../dtos/config.dto';
import { Config } from '../entities/config.entity';
import { IConfigRepository } from '../interfaces/config.repository.interface';

@EntityRepository(Config)
export class ConfigRepository extends RepositoryBase<Config> implements IConfigRepository {
    constructor(private configTransformHelper: ConfigTransformHelper<ConfigDTO>) {
        super();
    }

    async getMany(keys: IConfigKeys[]): Promise<Config[]> {
        const query = this.createQueryBuilder('config');

        // add filters
        query.where('config.key IN (:...keys)', { keys });

        // return values
        return query.getMany();
    }

    async getOne(key: IConfigKeys): Promise<ConfigDTO[IConfigKeys]> {
        const query = this.createQueryBuilder('config');

        // add filter
        query.where('config.key = :key', { keys: key });

        const meta = await query.getOne();

        const transformed = this.configTransformHelper.apply([meta], ConfigDTO);

        return transformed[key];
    }
}
