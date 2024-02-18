import { MigrationInterface, QueryRunner } from 'typeorm';

export class __newMigration__1700839912509 implements MigrationInterface {
  name = '__newMigration__1700839912509';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "project_image_detail" ADD "order" integer NOT NULL DEFAULT '0'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "project_image_detail" DROP COLUMN "order"`,
    );
  }
}
