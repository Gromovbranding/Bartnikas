import { MigrationInterface, QueryRunner } from 'typeorm';

export class __newMigration__1707317445744 implements MigrationInterface {
  name = '__newMigration__1707317445744';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "media_presentation_translate" ("id" SERIAL NOT NULL, "title" text NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "mediaPresentationId" integer, "languageId" integer, CONSTRAINT "PK_594e6cc8efec2d1109b1ec94957" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "media_presentation" DROP COLUMN "title"`,
    );
    await queryRunner.query(
      `ALTER TABLE "media_presentation_translate" ADD CONSTRAINT "FK_996b8f98f19d1f91615ca466ddf" FOREIGN KEY ("mediaPresentationId") REFERENCES "media_presentation"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "media_presentation_translate" ADD CONSTRAINT "FK_6d55c557e3f2edfafee558de7d1" FOREIGN KEY ("languageId") REFERENCES "language"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "media_presentation_translate" DROP CONSTRAINT "FK_6d55c557e3f2edfafee558de7d1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "media_presentation_translate" DROP CONSTRAINT "FK_996b8f98f19d1f91615ca466ddf"`,
    );
    await queryRunner.query(
      `ALTER TABLE "media_presentation" ADD "title" character varying NOT NULL`,
    );
    await queryRunner.query(`DROP TABLE "media_presentation_translate"`);
  }
}
