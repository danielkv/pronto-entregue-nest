import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IConfigKeys } from '../dtos/config.dto';
import { Config } from '../entities/config.entity';
import { IConfigRepository } from '../interfaces/config.repository.interface';
import { ConfigRepository } from '../repositories/config.repository';

@Injectable()
export class GetConfigService {
    constructor(@InjectRepository(ConfigRepository) private configRepository: IConfigRepository) {}

    async execute(keys: IConfigKeys[]): Promise<Config[]> {
        return this.configRepository.getMany(keys);
    }
}
