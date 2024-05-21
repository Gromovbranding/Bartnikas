import { MigrationInterface, QueryRunner } from 'typeorm';

export class __newMigration__1716320679132 implements MigrationInterface {
  name = '__newMigration__1716320679132';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "services" ("id" SERIAL NOT NULL, "is_active" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_ba2d347a3168a296416c6c5ccb2" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "services_translate" ("id" SERIAL NOT NULL, "title" text NOT NULL, "services" jsonb array NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "servicesTranslateId" integer, "languageId" integer, CONSTRAINT "PK_b0157410a8f8ef9e8f18a6c3a1b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "place_of_power_translate" ADD "exclusive_rates" jsonb array NOT NULL DEFAULT '[]'`,
    );
    await queryRunner.query(
      `ALTER TABLE "about_translate" ADD "recognition_cities" jsonb array NOT NULL DEFAULT '[]'`,
    );
    await queryRunner.query(
      `ALTER TABLE "services_translate" ADD CONSTRAINT "FK_69c7b5a56035a61b4d4158b1166" FOREIGN KEY ("servicesTranslateId") REFERENCES "services"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "services_translate" ADD CONSTRAINT "FK_2f9be479ee1be9b7153b2351386" FOREIGN KEY ("languageId") REFERENCES "language"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "services_translate" DROP CONSTRAINT "FK_2f9be479ee1be9b7153b2351386"`,
    );
    await queryRunner.query(
      `ALTER TABLE "services_translate" DROP CONSTRAINT "FK_69c7b5a56035a61b4d4158b1166"`,
    );
    await queryRunner.query(
      `ALTER TABLE "about_translate" DROP COLUMN "recognition_cities"`,
    );
    await queryRunner.query(
      `ALTER TABLE "place_of_power_translate" DROP COLUMN "exclusive_rates"`,
    );
    await queryRunner.query(`DROP TABLE "services_translate"`);
    await queryRunner.query(`DROP TABLE "services"`);
  }
}
