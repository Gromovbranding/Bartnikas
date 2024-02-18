import { MigrationInterface, QueryRunner } from 'typeorm';

export class __newMigration__1708182430868 implements MigrationInterface {
  name = '__newMigration__1708182430868';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "project_image_detail" ADD "image_name" character varying NOT NULL DEFAULT ''`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "project_image_detail" DROP COLUMN "image_name"`,
    );
  }
}
