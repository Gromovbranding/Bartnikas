import { MigrationInterface, QueryRunner } from 'typeorm';

export class __newMigration__1715936583590 implements MigrationInterface {
  name = '__newMigration__1715936583590';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "services_translate" ("id" SERIAL NOT NULL, "placeOfPowerTitle" text NOT NULL, "placeOfPowerUltraExclusiveAnchor" text NOT NULL, "placeOfPowerSubtitle" text NOT NULL, "placeOfPowerQuoteText" text NOT NULL, "placeOfPowerQuoteAuthor" text NOT NULL, "placeOfPowerTransformationTitle" text NOT NULL, "placeOfPowerListTitle" text NOT NULL, "placeOfPowerListItems" text NOT NULL, "photoportalIntroTitle" text NOT NULL, "photoportalIntroSubtitle" text NOT NULL, "photoportalIntroAction" text NOT NULL, "photoportalPeculiaritiesTitle" text NOT NULL, "photoportalPeculiaritiesList" text NOT NULL, "photoportalInfluenceTitle" text NOT NULL, "photoportalInfluenceQuoteText" text NOT NULL, "photoportalInfluenceQuoteAccent_text" text NOT NULL, "photoportalInfluenceQuoteAuthor" text NOT NULL, "photoportalForWhatTitle" text NOT NULL, "photoportalForWhatList" text NOT NULL, "photoportalPopupTitle" text NOT NULL, "photoportalPopupSubtitle_accent" text NOT NULL, "photoportalPopupSubtitle" text NOT NULL, "photoportalPopupBtn" text NOT NULL, "photoportalAgreement" text NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "servicesTranslateId" integer, "languageId" integer, CONSTRAINT "PK_b0157410a8f8ef9e8f18a6c3a1b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "services" ("id" SERIAL NOT NULL, "is_active" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_ba2d347a3168a296416c6c5ccb2" PRIMARY KEY ("id"))`,
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
    await queryRunner.query(`DROP TABLE "services"`);
    await queryRunner.query(`DROP TABLE "services_translate"`);
  }
}
