import { MigrationInterface, QueryRunner } from 'typeorm';

export class __newMigration__1707573726137 implements MigrationInterface {
  name = '__newMigration__1707573726137';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "bio_testimonial_translate" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "job" character varying NOT NULL, "testimonial" text NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "bioTestimonialId" integer, "languageId" integer, CONSTRAINT "PK_aff80aec4141b3ef000a0eaa497" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`ALTER TABLE "bio_testimonial" DROP COLUMN "name"`);
    await queryRunner.query(`ALTER TABLE "bio_testimonial" DROP COLUMN "job"`);
    await queryRunner.query(
      `ALTER TABLE "bio_testimonial" DROP COLUMN "testimonial"`,
    );
    await queryRunner.query(
      `ALTER TABLE "bio_testimonial_translate" ADD CONSTRAINT "FK_0733251f9993d881d2628713de6" FOREIGN KEY ("bioTestimonialId") REFERENCES "bio_testimonial"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "bio_testimonial_translate" ADD CONSTRAINT "FK_3e08b775a85246af6dcffb082d4" FOREIGN KEY ("languageId") REFERENCES "language"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "bio_testimonial_translate" DROP CONSTRAINT "FK_3e08b775a85246af6dcffb082d4"`,
    );
    await queryRunner.query(
      `ALTER TABLE "bio_testimonial_translate" DROP CONSTRAINT "FK_0733251f9993d881d2628713de6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "bio_testimonial" ADD "testimonial" text NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "bio_testimonial" ADD "job" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "bio_testimonial" ADD "name" character varying NOT NULL`,
    );
    await queryRunner.query(`DROP TABLE "bio_testimonial_translate"`);
  }
}
