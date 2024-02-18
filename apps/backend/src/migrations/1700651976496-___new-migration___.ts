import { MigrationInterface, QueryRunner } from 'typeorm';

export class __newMigration__1700651976496 implements MigrationInterface {
  name = '__newMigration__1700651976496';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "media_cv" ADD "pdfId" integer`);
    await queryRunner.query(
      `ALTER TABLE "media_cv" ADD CONSTRAINT "UQ_d8448743bd10cf96e0d280f0fc8" UNIQUE ("pdfId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "media_cv" ADD CONSTRAINT "FK_d8448743bd10cf96e0d280f0fc8" FOREIGN KEY ("pdfId") REFERENCES "file"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "media_cv" DROP CONSTRAINT "FK_d8448743bd10cf96e0d280f0fc8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "media_cv" DROP CONSTRAINT "UQ_d8448743bd10cf96e0d280f0fc8"`,
    );
    await queryRunner.query(`ALTER TABLE "media_cv" DROP COLUMN "pdfId"`);
  }
}
