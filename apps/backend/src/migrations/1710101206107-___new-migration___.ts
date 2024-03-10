import { MigrationInterface, QueryRunner } from 'typeorm';

export class __newMigration__1710101206107 implements MigrationInterface {
  name = '__newMigration__1710101206107';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "project_image_detail" ADD "coordinate" jsonb`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "project_image_detail" DROP COLUMN "coordinate"`,
    );
  }
}
