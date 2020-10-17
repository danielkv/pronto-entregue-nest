import { MigrationInterface, QueryRunner } from 'typeorm';

export class newPermissions1602956386218 implements MigrationInterface {
    name = 'newPermissions1602956386218';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE `company_users` ADD `permissions` json NULL');
        await queryRunner.query('ALTER TABLE `users` ADD `isMaster` tinyint NOT NULL DEFAULT 0');
        await queryRunner.query(
            "ALTER TABLE `users` CHANGE `role` `role` varchar(255) NOT NULL COMMENT 'master | default' DEFAULT 'customer'",
        );

        await queryRunner.query("UPDATE users SET isMaster = true WHERE role = 'master'");

        await queryRunner.query(
            'UPDATE company_users SET permissions = (SELECT roles.permissions FROM roles WHERE roles.id = company_users.roleId)',
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            'ALTER TABLE `users` CHANGE `role` `role` varchar(255) CHARACTER SET "latin1" COLLATE "latin1_swedish_ci" NOT NULL COMMENT \'master | default\' DEFAULT \'default\'',
        );
        await queryRunner.query('ALTER TABLE `users` DROP COLUMN `isMaster`');
        await queryRunner.query('ALTER TABLE `company_users` DROP COLUMN `permissions`');
    }
}
