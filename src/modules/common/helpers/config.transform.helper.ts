import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { ClassType } from 'class-transformer/ClassTransformer';

interface IConfig {
    key: string;
    value: string;
}

@Injectable()
export class ConfigTransformHelper<Schema> {
    apply(metas: IConfig[], schema: ClassType<Schema>) {
        const configs = metas.reduce((result, { key, value }) => {
            if (!result[key]) result[key] = value;

            return result;
        }, {});

        return plainToClass(schema, configs, { enableImplicitConversion: true });
    }
}
