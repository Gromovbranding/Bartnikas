import { MigrationInterface, QueryRunner } from 'typeorm';

export class __newMigration__1706968801048 implements MigrationInterface {
  name = '__newMigration__1706968801048';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "news_translate" ("id" SERIAL NOT NULL, "title" text NOT NULL, "description" text NOT NULL, "text" text NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "newsId" integer, "languageId" integer, CONSTRAINT "PK_8a5dd6f4463856bb37e298ee68f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`ALTER TABLE "news" DROP COLUMN "title"`);
    await queryRunner.query(`ALTER TABLE "news" DROP COLUMN "description"`);
    await queryRunner.query(`ALTER TABLE "news" DROP COLUMN "text"`);
    await queryRunner.query(
      `ALTER TABLE "news_translate" ADD CONSTRAINT "FK_20ff209bc790215eb090daafd33" FOREIGN KEY ("newsId") REFERENCES "news"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "news_translate" ADD CONSTRAINT "FK_40a9a4d0c52f8b82de3a74bf13e" FOREIGN KEY ("languageId") REFERENCES "language"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "news_translate" DROP CONSTRAINT "FK_40a9a4d0c52f8b82de3a74bf13e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "news_translate" DROP CONSTRAINT "FK_20ff209bc790215eb090daafd33"`,
    );
    await queryRunner.query(`ALTER TABLE "news" ADD "text" text NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "news" ADD "description" text NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "news" ADD "title" character varying NOT NULL`,
    );
    await queryRunner.query(`DROP TABLE "news_translate"`);
  }
}
