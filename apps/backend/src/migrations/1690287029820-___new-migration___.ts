import { MigrationInterface, QueryRunner } from 'typeorm';

export class __newMigration__1690287029820 implements MigrationInterface {
  name = '__newMigration__1690287029820';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "bio" ADD "is_active" boolean NOT NULL DEFAULT false`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "bio" DROP COLUMN "is_active"`);
  }
}
