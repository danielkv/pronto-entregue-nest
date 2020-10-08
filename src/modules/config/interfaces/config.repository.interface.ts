import { IRepositoryBase } from 'src/modules/common/interfaces/repository.base.interface';
import { ConfigDTO, IConfigKeys } from '../dtos/config.dto';
import { Config } from '../entities/config.entity';

export interface IConfigRepository extends IRepositoryBase<Config> {
    getMany(keys: IConfigKeys[]): Promise<Config[]>;
    getOne(key: IConfigKeys): Promise<ConfigDTO[IConfigKeys]>;
}
