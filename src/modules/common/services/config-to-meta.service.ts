import { Injectable } from '@nestjs/common';

interface IConfigConvert {
    key: string;
    value: string;
}

@Injectable()
export class ConfigToMetaService<Schema, T extends IConfigConvert> {
    execute(config: Schema, from: T): T[] {
        return Object.keys(config).map(key => {
            const value = config[key];

            from.key = key;
            from.value = value;

            return from;
        });
    }
}
