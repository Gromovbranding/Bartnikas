import { MigrationInterface, QueryRunner } from 'typeorm';

export class __newMigration__1690302931135 implements MigrationInterface {
  name = '__newMigration__1690302931135';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "project_payment_by_email" DROP CONSTRAINT "FK_5dac2fcb262e3ab56ae53a30e87"`,
    );
    await queryRunner.query(
      `ALTER TABLE "project_payment_by_email" DROP CONSTRAINT "REL_5dac2fcb262e3ab56ae53a30e8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "project_payment_by_email" DROP COLUMN "imageId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "project_payment_by_email" ADD "image_id" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "project_payment_by_email" ADD "project_id" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "project_payment_by_email" ADD "selected_size_id" integer NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "project_payment_by_email" DROP COLUMN "selected_size_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "project_payment_by_email" DROP COLUMN "project_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "project_payment_by_email" DROP COLUMN "image_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "project_payment_by_email" ADD "imageId" integer`,
    );
    await queryRunner.query(
      `ALTER TABLE "project_payment_by_email" ADD CONSTRAINT "REL_5dac2fcb262e3ab56ae53a30e8" UNIQUE ("imageId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "project_payment_by_email" ADD CONSTRAINT "FK_5dac2fcb262e3ab56ae53a30e87" FOREIGN KEY ("imageId") REFERENCES "project_image_detail"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
  }
}
