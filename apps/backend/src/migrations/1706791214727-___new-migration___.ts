import { MigrationInterface, QueryRunner } from 'typeorm';

export class __newMigration__1706791214727 implements MigrationInterface {
  name = '__newMigration__1706791214727';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "language" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "code" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_465b3173cdddf0ac2d3fe73a33c" UNIQUE ("code"), CONSTRAINT "PK_cc0a99e710eb3733f6fb42b1d4c" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "bio_translate" ("id" SERIAL NOT NULL, "description" text NOT NULL, "sub_description" text NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "bioId" integer, "languageId" integer, CONSTRAINT "PK_4c1c485c4feac8b769f0766def5" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`ALTER TABLE "bio" DROP COLUMN "sub_description"`);
    await queryRunner.query(`ALTER TABLE "bio" DROP COLUMN "description"`);
    await queryRunner.query(
      `ALTER TABLE "bio_translate" ADD CONSTRAINT "FK_9a9117d558d9a9cef47ebbe3f1b" FOREIGN KEY ("bioId") REFERENCES "bio"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "bio_translate" ADD CONSTRAINT "FK_85132cf81e4fe5bc4f7b1340de2" FOREIGN KEY ("languageId") REFERENCES "language"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `INSERT INTO language ( code, name ) VALUES ('ru', 'Русский'), ('en', 'English'), ('de', 'Deutsch'), ('fr', 'Français')`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "bio_translate" DROP CONSTRAINT "FK_85132cf81e4fe5bc4f7b1340de2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "bio_translate" DROP CONSTRAINT "FK_9a9117d558d9a9cef47ebbe3f1b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "bio" ADD "description" text NOT NULL DEFAULT ''`,
    );
    await queryRunner.query(
      `ALTER TABLE "bio" ADD "sub_description" text NOT NULL DEFAULT ''`,
    );
    await queryRunner.query(`DROP TABLE "bio_translate"`);
    await queryRunner.query(`DROP TABLE "language"`);
  }
}
