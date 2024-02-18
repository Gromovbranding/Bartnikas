import { MigrationInterface, QueryRunner } from 'typeorm';

export class __newMigration__1690288445730 implements MigrationInterface {
  name = '__newMigration__1690288445730';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "delivery_static" DROP COLUMN "sub_title"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "delivery_static" ADD "sub_title" character varying NOT NULL`,
    );
  }
}
