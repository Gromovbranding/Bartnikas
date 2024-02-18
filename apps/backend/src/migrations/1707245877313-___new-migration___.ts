import { MigrationInterface, QueryRunner } from 'typeorm';

export class __newMigration__1707245877313 implements MigrationInterface {
  name = '__newMigration__1707245877313';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "media_exhibition_translate" ("id" SERIAL NOT NULL, "title" text NOT NULL, "awards" text NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "mediaExhibitionId" integer, "languageId" integer, CONSTRAINT "PK_05deb8a551ad3765d5f996eda73" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "media_exhibition" DROP COLUMN "title"`,
    );
    await queryRunner.query(
      `ALTER TABLE "media_exhibition" DROP COLUMN "awards"`,
    );
    await queryRunner.query(
      `ALTER TABLE "media_exhibition_translate" ADD CONSTRAINT "FK_918662f6eed6b7936a72470ffd5" FOREIGN KEY ("mediaExhibitionId") REFERENCES "media_exhibition"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "media_exhibition_translate" ADD CONSTRAINT "FK_8711e705f39a6172bece7b0b6b6" FOREIGN KEY ("languageId") REFERENCES "language"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "media_exhibition_translate" DROP CONSTRAINT "FK_8711e705f39a6172bece7b0b6b6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "media_exhibition_translate" DROP CONSTRAINT "FK_918662f6eed6b7936a72470ffd5"`,
    );
    await queryRunner.query(
      `ALTER TABLE "media_exhibition" ADD "awards" text NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "media_exhibition" ADD "title" character varying NOT NULL`,
    );
    await queryRunner.query(`DROP TABLE "media_exhibition_translate"`);
  }
}
