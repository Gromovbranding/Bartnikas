import { MigrationInterface, QueryRunner } from 'typeorm';

export class __newMigration__1696927464841 implements MigrationInterface {
  name = '__newMigration__1696927464841';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "footer_contact" ("id" SERIAL NOT NULL, "socials" jsonb NOT NULL DEFAULT '[]', "menu_links" jsonb NOT NULL DEFAULT '[]', "active" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "logoId" integer, CONSTRAINT "REL_bf8473fd03f661a59ccb502057" UNIQUE ("logoId"), CONSTRAINT "PK_a02e6f6626b0b053d579f789b42" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "project_image_sizes" ADD "quantity" integer NOT NULL DEFAULT '1'`,
    );
    await queryRunner.query(
      `ALTER TABLE "project_payment_by_email" ADD "quantity" integer NOT NULL DEFAULT '1'`,
    );
    await queryRunner.query(
      `ALTER TABLE "footer_contact" ADD CONSTRAINT "FK_bf8473fd03f661a59ccb5020577" FOREIGN KEY ("logoId") REFERENCES "file"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "footer_contact" DROP CONSTRAINT "FK_bf8473fd03f661a59ccb5020577"`,
    );
    await queryRunner.query(
      `ALTER TABLE "project_payment_by_email" DROP COLUMN "quantity"`,
    );
    await queryRunner.query(
      `ALTER TABLE "project_image_sizes" DROP COLUMN "quantity"`,
    );
    await queryRunner.query(`DROP TABLE "footer_contact"`);
  }
}
