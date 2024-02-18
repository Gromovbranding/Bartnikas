import { MigrationInterface, QueryRunner } from 'typeorm';

export class __newMigration__1706985025673 implements MigrationInterface {
  name = '__newMigration__1706985025673';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "blog_translate" ("id" SERIAL NOT NULL, "title" text NOT NULL, "description" text NOT NULL, "text" text NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "blogId" integer, "languageId" integer, CONSTRAINT "PK_c5e4e2bcce493091a51b2ba6640" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`ALTER TABLE "blog" DROP COLUMN "text"`);
    await queryRunner.query(`ALTER TABLE "blog" DROP COLUMN "description"`);
    await queryRunner.query(`ALTER TABLE "blog" DROP COLUMN "title"`);
    await queryRunner.query(
      `ALTER TABLE "blog_translate" ADD CONSTRAINT "FK_55b5989061960b2938657d06ec3" FOREIGN KEY ("blogId") REFERENCES "blog"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "blog_translate" ADD CONSTRAINT "FK_d56a9de343c45a60599a7cfff1a" FOREIGN KEY ("languageId") REFERENCES "language"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "blog_translate" DROP CONSTRAINT "FK_d56a9de343c45a60599a7cfff1a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "blog_translate" DROP CONSTRAINT "FK_55b5989061960b2938657d06ec3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "blog" ADD "title" character varying NOT NULL DEFAULT ''`,
    );
    await queryRunner.query(
      `ALTER TABLE "blog" ADD "description" text NOT NULL DEFAULT ''`,
    );
    await queryRunner.query(
      `ALTER TABLE "blog" ADD "text" text NOT NULL DEFAULT ''`,
    );
    await queryRunner.query(`DROP TABLE "blog_translate"`);
  }
}
