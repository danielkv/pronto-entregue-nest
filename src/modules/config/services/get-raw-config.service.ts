import { Inject, Injectable } from '@nestjs/common';
import { IConfigKeys } from '../dtos/config.dto';
import { Config } from '../entities/config.entity';
import { IConfigRepository } from '../interfaces/config.repository.interface';

@Injectable()
export class GetRawConfigService {
    constructor(@Inject('IConfigRepository') private configRepository: IConfigRepository) {}

    async execute(keys: IConfigKeys): Promise<Config>;
    async execute(keys: IConfigKeys[]): Promise<Config[]>;
    async execute(keys: any): Promise<Config | Config[]> {
        return this.configRepository.get(keys);
    }
}
