import { MigrationInterface, QueryRunner } from 'typeorm';

export class __newMigration__1707319885877 implements MigrationInterface {
  name = '__newMigration__1707319885877';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "media_publication_translate" ("id" SERIAL NOT NULL, "program" text NOT NULL, "subtitle" text NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "mediaPublicationId" integer, "languageId" integer, CONSTRAINT "PK_e1cacd5bc66fd87babce066a0f7" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "media_publication" DROP COLUMN "program"`,
    );
    await queryRunner.query(
      `ALTER TABLE "media_publication" DROP COLUMN "subtitle"`,
    );
    await queryRunner.query(
      `ALTER TABLE "media_publication_translate" ADD CONSTRAINT "FK_54d91f141fbb254ef814ec625ce" FOREIGN KEY ("mediaPublicationId") REFERENCES "media_publication"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "media_publication_translate" ADD CONSTRAINT "FK_d939053b459a8881f80182f6ba8" FOREIGN KEY ("languageId") REFERENCES "language"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "media_publication_translate" DROP CONSTRAINT "FK_d939053b459a8881f80182f6ba8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "media_publication_translate" DROP CONSTRAINT "FK_54d91f141fbb254ef814ec625ce"`,
    );
    await queryRunner.query(
      `ALTER TABLE "media_publication" ADD "subtitle" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "media_publication" ADD "program" character varying NOT NULL`,
    );
    await queryRunner.query(`DROP TABLE "media_publication_translate"`);
  }
}
