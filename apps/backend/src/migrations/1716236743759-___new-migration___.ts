import { MigrationInterface, QueryRunner } from 'typeorm';

export class __newMigration__1716236743759 implements MigrationInterface {
  name = '__newMigration__1716236743759';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "photoportal_translate" ADD "special_title" text NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "photoportal_translate" ADD "special_description" text NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "photoportal_translate" ADD "special_footer_text" text NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "photoportal_translate" ADD "special_action" text NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "photoportal_translate" DROP COLUMN "special_action"`,
    );
    await queryRunner.query(
      `ALTER TABLE "photoportal_translate" DROP COLUMN "special_footer_text"`,
    );
    await queryRunner.query(
      `ALTER TABLE "photoportal_translate" DROP COLUMN "special_description"`,
    );
    await queryRunner.query(
      `ALTER TABLE "photoportal_translate" DROP COLUMN "special_title"`,
    );
  }
}
