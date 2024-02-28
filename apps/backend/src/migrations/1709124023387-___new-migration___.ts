import { MigrationInterface, QueryRunner } from 'typeorm';

export class __newMigration__1709124023387 implements MigrationInterface {
  name = '__newMigration__1709124023387';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "video_collection" DROP CONSTRAINT "FK_69720e404548083698a9e13fb8d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "video_collection" RENAME COLUMN "projectId" TO "group"`,
    );
    await queryRunner.query(
      `ALTER TABLE "video_collection" DROP COLUMN "group"`,
    );
    await queryRunner.query(
      `ALTER TABLE "video_collection" ADD "group" character varying NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "video_collection" DROP COLUMN "group"`,
    );
    await queryRunner.query(
      `ALTER TABLE "video_collection" ADD "group" integer`,
    );
    await queryRunner.query(
      `ALTER TABLE "video_collection" RENAME COLUMN "group" TO "projectId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "video_collection" ADD CONSTRAINT "FK_69720e404548083698a9e13fb8d" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
  }
}
