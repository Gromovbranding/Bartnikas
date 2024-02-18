import { MigrationInterface, QueryRunner } from 'typeorm';

export class __newMigration__1699958594986 implements MigrationInterface {
  name = '__newMigration__1699958594986';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "project" ADD "is_show_index_footer_card" boolean NOT NULL DEFAULT false`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "project" DROP COLUMN "is_show_index_footer_card"`,
    );
  }
}
