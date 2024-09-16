import { MigrationInterface, QueryRunner } from 'typeorm';

export class __newMigration__1726478611218 implements MigrationInterface {
  name = '__newMigration__1726478611218';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "footer_contact_translate" ("id" SERIAL NOT NULL, "socials" jsonb NOT NULL DEFAULT '[]', "menu_links" jsonb NOT NULL DEFAULT '[]', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "footerContactId" integer, "languageId" integer, CONSTRAINT "PK_ec11381e851651c355ec1426729" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "footer_contact" DROP COLUMN "socials"`,
    );
    await queryRunner.query(
      `ALTER TABLE "footer_contact" DROP COLUMN "menu_links"`,
    );
    await queryRunner.query(
      `ALTER TABLE "footer_contact_translate" ADD CONSTRAINT "FK_59c8b4a431b21b19f1e6295f63f" FOREIGN KEY ("footerContactId") REFERENCES "footer_contact"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "footer_contact_translate" ADD CONSTRAINT "FK_b09fd711a51fca72b98c7176a10" FOREIGN KEY ("languageId") REFERENCES "language"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "footer_contact_translate" DROP CONSTRAINT "FK_b09fd711a51fca72b98c7176a10"`,
    );
    await queryRunner.query(
      `ALTER TABLE "footer_contact_translate" DROP CONSTRAINT "FK_59c8b4a431b21b19f1e6295f63f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "footer_contact" ADD "menu_links" jsonb NOT NULL DEFAULT '[]'`,
    );
    await queryRunner.query(
      `ALTER TABLE "footer_contact" ADD "socials" jsonb NOT NULL DEFAULT '[]'`,
    );
    await queryRunner.query(`DROP TABLE "footer_contact_translate"`);
  }
}
