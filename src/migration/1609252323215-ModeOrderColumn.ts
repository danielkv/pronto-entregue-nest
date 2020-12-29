import {MigrationInterface, QueryRunner} from "typeorm";

export class ModeOrderColumn1609252323215 implements MigrationInterface {
    name = 'ModeOrderColumn1609252323215'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `orders` ADD `mode` enum ('simple', 'reserved', 'scheduled') NOT NULL DEFAULT 'simple'");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `orders` DROP COLUMN `mode`");
    }

}
