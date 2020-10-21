import { MigrationInterface, QueryRunner } from 'typeorm';

export class removeUsersSaltColumn1603291186152 implements MigrationInterface {
    name = 'removeUsersSaltColumn1603291186152';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("UPDATE users SET password = CONCAT('$', users.salt, '$', users.password)");
        await queryRunner.query('ALTER TABLE `users` DROP COLUMN `salt`');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            'ALTER TABLE `users` ADD `salt` varchar(255) CHARACTER SET "latin1" COLLATE "latin1_swedish_ci" NULL',
        );
    }
}
