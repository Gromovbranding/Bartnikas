import { MigrationInterface, QueryRunner } from 'typeorm';

export class __newMigration__1694686335021 implements MigrationInterface {
  name = '__newMigration__1694686335021';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "file" DROP COLUMN "url"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "file" ADD "url" character varying NOT NULL`,
    );
  }
}
