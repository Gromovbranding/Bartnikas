import { MigrationInterface, QueryRunner } from 'typeorm';

export class __newMigration__1716134484489 implements MigrationInterface {
  name = '__newMigration__1716134484489';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "place_of_power" ("id" SERIAL NOT NULL, "is_active" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_2d1180b693afc60602df718e706" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "place_of_power_translate" ("id" SERIAL NOT NULL, "title" text NOT NULL, "ultra_exclusive_anchor" text NOT NULL, "subtitle" text NOT NULL, "quote_text" text NOT NULL, "quote_author" text NOT NULL, "transformation_title" text NOT NULL, "list_title" text NOT NULL, "list_items" text NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "placeOfPowerTranslateId" integer, "languageId" integer, CONSTRAINT "PK_d0d07d0700d1eebe4c6fb92bd34" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "photoportal" ("id" SERIAL NOT NULL, "is_active" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_0b98ddf5161dcb0290f89b5a64c" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "photoportal_translate" ("id" SERIAL NOT NULL, "intro_title" text NOT NULL, "intro_subtitle" text NOT NULL, "intro_action" text NOT NULL, "peculiarities_title" text NOT NULL, "peculiarities_list" text NOT NULL, "influence_title" text NOT NULL, "influence_quote_text" text NOT NULL, "influence_quote_accent_text" text NOT NULL, "influence_quote_author" text NOT NULL, "for_what_title" text NOT NULL, "for_what_list" text NOT NULL, "popup_title" text NOT NULL, "popup_subtitle_accent" text NOT NULL, "popup_subtitle" text NOT NULL, "popup_btn" text NOT NULL, "agreement" text NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "photoportalTranslateId" integer, "languageId" integer, CONSTRAINT "PK_ddf881f5e10e69ef9248c5c1341" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "place_of_power_translate" ADD CONSTRAINT "FK_5ddea9abba8e530ab6c6efcccc0" FOREIGN KEY ("placeOfPowerTranslateId") REFERENCES "place_of_power"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "place_of_power_translate" ADD CONSTRAINT "FK_147c832314bfb903e9497e9073c" FOREIGN KEY ("languageId") REFERENCES "language"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "photoportal_translate" ADD CONSTRAINT "FK_91797e9e0db64c02aa0207bae4a" FOREIGN KEY ("photoportalTranslateId") REFERENCES "photoportal"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "photoportal_translate" ADD CONSTRAINT "FK_73686559dc0683048bdfc2f7bcd" FOREIGN KEY ("languageId") REFERENCES "language"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "photoportal_translate" DROP CONSTRAINT "FK_73686559dc0683048bdfc2f7bcd"`,
    );
    await queryRunner.query(
      `ALTER TABLE "photoportal_translate" DROP CONSTRAINT "FK_91797e9e0db64c02aa0207bae4a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "place_of_power_translate" DROP CONSTRAINT "FK_147c832314bfb903e9497e9073c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "place_of_power_translate" DROP CONSTRAINT "FK_5ddea9abba8e530ab6c6efcccc0"`,
    );
    await queryRunner.query(`DROP TABLE "photoportal_translate"`);
    await queryRunner.query(`DROP TABLE "photoportal"`);
    await queryRunner.query(`DROP TABLE "place_of_power_translate"`);
    await queryRunner.query(`DROP TABLE "place_of_power"`);
  }
}
