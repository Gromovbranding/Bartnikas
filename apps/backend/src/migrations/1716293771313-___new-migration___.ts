import { MigrationInterface, QueryRunner } from 'typeorm';

export class __newMigration__1716293771313 implements MigrationInterface {
  name = '__newMigration__1716293771313';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "about" ("id" SERIAL NOT NULL, "is_active" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "videoId" integer, "posterId" integer, CONSTRAINT "REL_5ff54e53810e189381f927814f" UNIQUE ("videoId"), CONSTRAINT "REL_c428126f4ce78f1dac60f85a31" UNIQUE ("posterId"), CONSTRAINT "PK_e7b581a8a74d0a2ea3aa53226ee" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "about_translate" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "subtitle" character varying NOT NULL, "advantages" jsonb array NOT NULL, "concept_title" character varying NOT NULL, "concept_text" character varying NOT NULL, "ticker_title" character varying NOT NULL, "ticker_text" character varying NOT NULL, "recognition_title" character varying NOT NULL, "recognition_text" character varying NOT NULL, "achievements" jsonb array NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "aboutId" integer, "languageId" integer, CONSTRAINT "PK_17df07a6e418ae8ecc0aa6f1e08" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "about" ADD CONSTRAINT "FK_5ff54e53810e189381f927814f4" FOREIGN KEY ("videoId") REFERENCES "file"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "about" ADD CONSTRAINT "FK_c428126f4ce78f1dac60f85a314" FOREIGN KEY ("posterId") REFERENCES "file"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "about_translate" ADD CONSTRAINT "FK_e2abb2a4d1db54af684bf302cc3" FOREIGN KEY ("aboutId") REFERENCES "about"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "about_translate" ADD CONSTRAINT "FK_bf20b7878cac4427f964cc87119" FOREIGN KEY ("languageId") REFERENCES "language"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "about_translate" DROP CONSTRAINT "FK_bf20b7878cac4427f964cc87119"`,
    );
    await queryRunner.query(
      `ALTER TABLE "about_translate" DROP CONSTRAINT "FK_e2abb2a4d1db54af684bf302cc3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "about" DROP CONSTRAINT "FK_c428126f4ce78f1dac60f85a314"`,
    );
    await queryRunner.query(
      `ALTER TABLE "about" DROP CONSTRAINT "FK_5ff54e53810e189381f927814f4"`,
    );
    await queryRunner.query(`DROP TABLE "about_translate"`);
    await queryRunner.query(`DROP TABLE "about"`);
  }
}
