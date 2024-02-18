import { MigrationInterface, QueryRunner } from 'typeorm';

export class __newMigration__1708121016868 implements MigrationInterface {
  name = '__newMigration__1708121016868';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "video_collection_translate" ("id" SERIAL NOT NULL, "title" text NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "videoCollectionId" integer, "languageId" integer, CONSTRAINT "PK_ccd24f5c6226d50e1553c2060a8" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "video_collection" DROP COLUMN "title"`,
    );
    await queryRunner.query(
      `ALTER TABLE "video_collection_translate" ADD CONSTRAINT "FK_c414cf4397f5cc8b02d66743c30" FOREIGN KEY ("videoCollectionId") REFERENCES "video_collection"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "video_collection_translate" ADD CONSTRAINT "FK_7d2b53f1ebdcd220aefb6345f62" FOREIGN KEY ("languageId") REFERENCES "language"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "video_collection_translate" DROP CONSTRAINT "FK_7d2b53f1ebdcd220aefb6345f62"`,
    );
    await queryRunner.query(
      `ALTER TABLE "video_collection_translate" DROP CONSTRAINT "FK_c414cf4397f5cc8b02d66743c30"`,
    );
    await queryRunner.query(
      `ALTER TABLE "video_collection" ADD "title" character varying NOT NULL`,
    );
    await queryRunner.query(`DROP TABLE "video_collection_translate"`);
  }
}
