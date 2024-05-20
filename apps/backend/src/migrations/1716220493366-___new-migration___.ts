import { MigrationInterface, QueryRunner } from 'typeorm';

export class __newMigration__1716220493366 implements MigrationInterface {
  name = '__newMigration__1716220493366';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "place_of_power_translate" DROP COLUMN "ultra_exclusive_anchor"`,
    );
    await queryRunner.query(
      `ALTER TABLE "place_of_power_translate" ADD "artefact_title" text NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "place_of_power_translate" ADD "artefact_text" text NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "place_of_power_translate" ADD "exclusive_title" text NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "place_of_power_translate" ADD "exclusive_head_text" text NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "place_of_power_translate" ADD "exclusive_subtitle" text NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "place_of_power_translate" ADD "exclusive_footer_info" text NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "place_of_power_translate" ADD "exclusive_footer_btn" text NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "place_of_power_translate" ADD "popup_title" text NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "place_of_power_translate" ADD "popup_subtitle" text NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "place_of_power_translate" ADD "popup_note" text NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "place_of_power_translate" ADD "popup_btn" text NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "place_of_power_translate" ADD "agreement" text NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "place_of_power_translate" DROP COLUMN "agreement"`,
    );
    await queryRunner.query(
      `ALTER TABLE "place_of_power_translate" DROP COLUMN "popup_btn"`,
    );
    await queryRunner.query(
      `ALTER TABLE "place_of_power_translate" DROP COLUMN "popup_note"`,
    );
    await queryRunner.query(
      `ALTER TABLE "place_of_power_translate" DROP COLUMN "popup_subtitle"`,
    );
    await queryRunner.query(
      `ALTER TABLE "place_of_power_translate" DROP COLUMN "popup_title"`,
    );
    await queryRunner.query(
      `ALTER TABLE "place_of_power_translate" DROP COLUMN "exclusive_footer_btn"`,
    );
    await queryRunner.query(
      `ALTER TABLE "place_of_power_translate" DROP COLUMN "exclusive_footer_info"`,
    );
    await queryRunner.query(
      `ALTER TABLE "place_of_power_translate" DROP COLUMN "exclusive_subtitle"`,
    );
    await queryRunner.query(
      `ALTER TABLE "place_of_power_translate" DROP COLUMN "exclusive_head_text"`,
    );
    await queryRunner.query(
      `ALTER TABLE "place_of_power_translate" DROP COLUMN "exclusive_title"`,
    );
    await queryRunner.query(
      `ALTER TABLE "place_of_power_translate" DROP COLUMN "artefact_text"`,
    );
    await queryRunner.query(
      `ALTER TABLE "place_of_power_translate" DROP COLUMN "artefact_title"`,
    );
    await queryRunner.query(
      `ALTER TABLE "place_of_power_translate" ADD "ultra_exclusive_anchor" text NOT NULL`,
    );
  }
}
