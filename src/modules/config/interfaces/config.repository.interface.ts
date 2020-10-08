import { ConfigDTO, IConfigKeys } from '../dtos/config.dto';
import { Config } from '../entities/config.entity';

export interface IConfigRepository {
    getMany(keys: IConfigKeys[]): Promise<Config[]>;
    getOne(key: IConfigKeys): Promise<ConfigDTO[IConfigKeys]>;
}
