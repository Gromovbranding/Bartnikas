import { MigrationInterface, QueryRunner } from 'typeorm';

export class __newMigration__1708189998670 implements MigrationInterface {
  name = '__newMigration__1708189998670';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "testimonials_translate" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "additional_info" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "testimonialId" integer, "languageId" integer, CONSTRAINT "PK_689259c1335a6501369767a571e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`ALTER TABLE "testimonials" DROP COLUMN "title"`);
    await queryRunner.query(
      `ALTER TABLE "testimonials" DROP COLUMN "additional_info"`,
    );
    await queryRunner.query(
      `ALTER TABLE "project_image_detail" ALTER COLUMN "image_name" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "testimonials_translate" ADD CONSTRAINT "FK_fcf19a688f9cba1480899f9d1de" FOREIGN KEY ("testimonialId") REFERENCES "testimonials"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "testimonials_translate" ADD CONSTRAINT "FK_795872ae6092a1f73a2ca4c87a9" FOREIGN KEY ("languageId") REFERENCES "language"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "testimonials_translate" DROP CONSTRAINT "FK_795872ae6092a1f73a2ca4c87a9"`,
    );
    await queryRunner.query(
      `ALTER TABLE "testimonials_translate" DROP CONSTRAINT "FK_fcf19a688f9cba1480899f9d1de"`,
    );
    await queryRunner.query(
      `ALTER TABLE "project_image_detail" ALTER COLUMN "image_name" SET DEFAULT ''`,
    );
    await queryRunner.query(
      `ALTER TABLE "testimonials" ADD "additional_info" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "testimonials" ADD "title" character varying NOT NULL`,
    );
    await queryRunner.query(`DROP TABLE "testimonials_translate"`);
  }
}
