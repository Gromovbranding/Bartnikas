import { MigrationInterface, QueryRunner } from 'typeorm';

export class __newMigration__1706958037808 implements MigrationInterface {
  name = '__newMigration__1706958037808';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "faq_translate" ("id" SERIAL NOT NULL, "title" text NOT NULL, "description" text NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "faqId" integer, "languageId" integer, CONSTRAINT "PK_b778732da2c9ff99da4ea7330a9" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`ALTER TABLE "faq" DROP COLUMN "title"`);
    await queryRunner.query(`ALTER TABLE "faq" DROP COLUMN "description"`);
    await queryRunner.query(
      `ALTER TABLE "faq_translate" ADD CONSTRAINT "FK_641354610642e1d5c9e01d929a2" FOREIGN KEY ("faqId") REFERENCES "faq"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "faq_translate" ADD CONSTRAINT "FK_86dacc49c1009dc6443932e1452" FOREIGN KEY ("languageId") REFERENCES "language"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "faq_translate" DROP CONSTRAINT "FK_86dacc49c1009dc6443932e1452"`,
    );
    await queryRunner.query(
      `ALTER TABLE "faq_translate" DROP CONSTRAINT "FK_641354610642e1d5c9e01d929a2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "faq" ADD "description" text NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "faq" ADD "title" character varying NOT NULL`,
    );
    await queryRunner.query(`DROP TABLE "faq_translate"`);
  }
}
