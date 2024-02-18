import { MigrationInterface, QueryRunner } from 'typeorm';

export class __newMigration__1690289937181 implements MigrationInterface {
  name = '__newMigration__1690289937181';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "project_payment_by_email" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "imageId" integer, CONSTRAINT "REL_5dac2fcb262e3ab56ae53a30e8" UNIQUE ("imageId"), CONSTRAINT "PK_ac703ba56b4e5d20930b81b928f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "project_payment_by_email" ADD CONSTRAINT "FK_5dac2fcb262e3ab56ae53a30e87" FOREIGN KEY ("imageId") REFERENCES "project_image_detail"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "project_payment_by_email" DROP CONSTRAINT "FK_5dac2fcb262e3ab56ae53a30e87"`,
    );
    await queryRunner.query(`DROP TABLE "project_payment_by_email"`);
  }
}
