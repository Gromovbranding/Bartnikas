import { MigrationInterface, QueryRunner } from 'typeorm';

export class __newMigration__1696935738871 implements MigrationInterface {
  name = '__newMigration__1696935738871';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "index_card_footer" ("id" SERIAL NOT NULL, "active" boolean NOT NULL DEFAULT false, "title" character varying NOT NULL, "text" character varying NOT NULL, "button" jsonb NOT NULL DEFAULT '{}', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_6e2ce0d93e27fb036f1dfde552a" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "index_card_footer"`);
  }
}
