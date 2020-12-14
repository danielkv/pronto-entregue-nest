import { join, resolve } from 'path';

import 'dotenv/config';
import { ConnectionOptions } from 'typeorm';

class ConfigService {
    constructor(private env: { [k: string]: string | undefined }) {}

    getValue(key: string, throwOnMissing = true): string {
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

    public getTypeOrmConfig(): ConnectionOptions {
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
            logging: !this.isProduction(),

            ssl: this.isProduction(),
        };
    }

    public getMailerTransportConfig() {
        return {
            secure: this.getValue('EMAIL_SECURE') === 'true',
            host: this.getValue('EMAIL_HOST'),
            port: this.getValue('EMAIL_PORT'),
            auth: {
                user: this.getValue('EMAIL_USERNAME'),
                pass: this.getValue('EMAIL_PASSWORD'),
            },
            debug: false,
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
