import { MigrationInterface, QueryRunner } from 'typeorm';

export class __newMigration__1700840449119 implements MigrationInterface {
  name = '__newMigration__1700840449119';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "project_image_detail" ADD "is_show_poster" boolean NOT NULL DEFAULT false`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "project_image_detail" DROP COLUMN "is_show_poster"`,
    );
  }
}
