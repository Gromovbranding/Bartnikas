import { MigrationInterface, QueryRunner } from 'typeorm';

export class __newMigration__1708119082304 implements MigrationInterface {
  name = '__newMigration__1708119082304';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "terms_static_translate" ("id" SERIAL NOT NULL, "title" text NOT NULL, "description" text NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "termsStaticId" integer, "languageId" integer, CONSTRAINT "PK_57fb8b9d8ca86c47f84b3a5b904" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "greeting_index_translate" ("id" SERIAL NOT NULL, "text" text NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "greetingIndexId" integer, "languageId" integer, CONSTRAINT "PK_65f56f49a3f55d414ec821813c7" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`ALTER TABLE "terms_static" DROP COLUMN "title"`);
    await queryRunner.query(
      `ALTER TABLE "terms_static" DROP COLUMN "description"`,
    );
    await queryRunner.query(`ALTER TABLE "greeting_index" DROP COLUMN "text"`);
    await queryRunner.query(
      `ALTER TABLE "terms_static_translate" ADD CONSTRAINT "FK_83cf83db94ff246634c5218b3be" FOREIGN KEY ("termsStaticId") REFERENCES "terms_static"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "terms_static_translate" ADD CONSTRAINT "FK_579426198528b5aa710404b6efd" FOREIGN KEY ("languageId") REFERENCES "language"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "greeting_index_translate" ADD CONSTRAINT "FK_c00d8ed53df0f2c0ecd8d3c43f7" FOREIGN KEY ("greetingIndexId") REFERENCES "greeting_index"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "greeting_index_translate" ADD CONSTRAINT "FK_8f7801507df20790553ca49bc93" FOREIGN KEY ("languageId") REFERENCES "language"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "greeting_index_translate" DROP CONSTRAINT "FK_8f7801507df20790553ca49bc93"`,
    );
    await queryRunner.query(
      `ALTER TABLE "greeting_index_translate" DROP CONSTRAINT "FK_c00d8ed53df0f2c0ecd8d3c43f7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "terms_static_translate" DROP CONSTRAINT "FK_579426198528b5aa710404b6efd"`,
    );
    await queryRunner.query(
      `ALTER TABLE "terms_static_translate" DROP CONSTRAINT "FK_83cf83db94ff246634c5218b3be"`,
    );
    await queryRunner.query(
      `ALTER TABLE "greeting_index" ADD "text" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "terms_static" ADD "description" text NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "terms_static" ADD "title" character varying NOT NULL`,
    );
    await queryRunner.query(`DROP TABLE "greeting_index_translate"`);
    await queryRunner.query(`DROP TABLE "terms_static_translate"`);
  }
}
