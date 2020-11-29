import {MigrationInterface, QueryRunner} from "typeorm";

export class deliveryAreaType1606657957852 implements MigrationInterface {
    name = 'deliveryAreaType1606657957852'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `delivery_areas` ADD `type` enum ('peDelivery', 'delivery') NOT NULL DEFAULT 'delivery'");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `delivery_areas` DROP COLUMN `type`");
    }

}
