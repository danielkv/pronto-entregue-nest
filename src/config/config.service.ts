import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join, resolve } from 'path';

import 'dotenv/config';

class ConfigService {
    constructor(private env: { [k: string]: string | undefined }) {}

    private getValue(key: string, throwOnMissing = true): string {
        const value = this.env[key];
        if (typeof value === 'undefined' && throwOnMissing) {
            throw new Error(`config error - missing env.${key}`);
        }

        return value;
    }

    public ensureValues(keys: string[]) {
        keys.forEach(k => this.getValue(k, true));
        return this;
    }

    public getPort() {
        return this.getValue('PORT', true);
    }

    public isProduction() {
        const mode = this.getValue('NODE_ENV', false);
        return mode === 'production';
    }

    public getTypeOrmConfig(): TypeOrmModuleOptions {
        return {
            type: 'mysql',
            legacySpatialSupport: false,
            host: this.getValue('MYSQL_HOST'),
            port: parseInt(this.getValue('MYSQL_PORT')),
            username: this.getValue('MYSQL_USER'),
            password: this.getValue('MYSQL_PASSWORD'),
            database: this.getValue('MYSQL_DATABASE'),

            entities: [
                join(__dirname, '..', '**', '**.entity{.js,.ts}'),
                //'dist/**/**.entity{.js,.ts}',
                //'src/**/**.entity{.js,.ts}',
            ],
            //autoLoadEntities: true,

            migrationsTableName: 'migration',

            migrations: [resolve(__dirname, '..', 'migration/*{.js,.ts}')],

            cli: {
                migrationsDir: 'src/migration',
            },

            ssl: this.isProduction(),
        };
    }
}

const configService = new ConfigService(process.env).ensureValues([
    'MYSQL_HOST',
    'MYSQL_PORT',
    'MYSQL_USER',
    'MYSQL_PASSWORD',
    'MYSQL_DATABASE',
]);

export { configService };
