import { MigrationInterface, QueryRunner } from 'typeorm';

export class __newMigration__1707577630726 implements MigrationInterface {
  name = '__newMigration__1707577630726';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "awards_translate" ("id" SERIAL NOT NULL, "title" text NOT NULL, "description" text NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "awardsId" integer, "languageId" integer, CONSTRAINT "PK_b20e2ee7515f94c84cb1319b2a1" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`ALTER TABLE "awards" DROP COLUMN "description"`);
    await queryRunner.query(`ALTER TABLE "awards" DROP COLUMN "title"`);
    await queryRunner.query(
      `ALTER TABLE "awards_translate" ADD CONSTRAINT "FK_9820e52f97101cfcfa77cf09de6" FOREIGN KEY ("awardsId") REFERENCES "awards"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "awards_translate" ADD CONSTRAINT "FK_53a384e7cf68a3f276ae814b478" FOREIGN KEY ("languageId") REFERENCES "language"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "awards_translate" DROP CONSTRAINT "FK_53a384e7cf68a3f276ae814b478"`,
    );
    await queryRunner.query(
      `ALTER TABLE "awards_translate" DROP CONSTRAINT "FK_9820e52f97101cfcfa77cf09de6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "awards" ADD "title" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "awards" ADD "description" character varying NOT NULL`,
    );
    await queryRunner.query(`DROP TABLE "awards_translate"`);
  }
}
