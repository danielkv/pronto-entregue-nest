import { RepositoryBase } from '../../common/repositories/repository.base';
import { EntityRepository } from 'typeorm';

import { Config } from '../entities/config.entity';

@EntityRepository(Config)
export class ConfigRepository extends RepositoryBase<Config> {}
